param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
$projectDirectory = $PSScriptRoot

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Get-NodeExecutable {
    $candidates = [System.Collections.Generic.List[string]]::new()
    $nodeFromPath = Get-Command node.exe -ErrorAction SilentlyContinue
    if ($nodeFromPath) {
        $candidates.Add($nodeFromPath.Source)
    }

    if ($env:NVM_SYMLINK) {
        $candidates.Add((Join-Path $env:NVM_SYMLINK "node.exe"))
    }
    if ($env:ProgramFiles) {
        $candidates.Add((Join-Path $env:ProgramFiles "nodejs\node.exe"))
    }
    if (${env:ProgramFiles(x86)}) {
        $candidates.Add((Join-Path ${env:ProgramFiles(x86)} "nodejs\node.exe"))
    }
    if ($env:LOCALAPPDATA) {
        $candidates.Add((Join-Path $env:LOCALAPPDATA "Programs\nodejs\node.exe"))
    }

    return $candidates |
        Where-Object { $_ -and (Test-Path -LiteralPath $_) } |
        Select-Object -First 1
}

function Install-NodeWithWinget {
    $winget = Get-Command winget.exe -ErrorAction SilentlyContinue
    if (-not $winget) {
        return $false
    }

    Write-Host "Installing Node.js LTS with Windows Package Manager..."
    & $winget.Source install `
        --id OpenJS.NodeJS.LTS `
        --exact `
        --source winget `
        --accept-package-agreements `
        --accept-source-agreements `
        --silent `
        --disable-interactivity

    return $LASTEXITCODE -eq 0
}

function Install-NodeFromOfficialMsi {
    Write-Host "Windows Package Manager is unavailable; using the official Node.js installer."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    $releases = Invoke-RestMethod -Uri "https://nodejs.org/dist/index.json"
    $release = $releases | Where-Object { $_.lts } | Select-Object -First 1
    if (-not $release) {
        throw "Could not determine the current Node.js LTS release."
    }

    $machineArchitecture = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString()
    $nodeArchitecture = if ($machineArchitecture -eq "Arm64") { "arm64" } else { "x64" }
    $fileName = "node-$($release.version)-$nodeArchitecture.msi"
    $releaseBaseUrl = "https://nodejs.org/dist/$($release.version)"
    $downloadUrl = "$releaseBaseUrl/$fileName"

    $temporaryDirectory = Join-Path ([IO.Path]::GetTempPath()) "dm-tool-setup"
    New-Item -ItemType Directory -Force -Path $temporaryDirectory | Out-Null
    $installerPath = Join-Path $temporaryDirectory $fileName

    try {
        Write-Host "Downloading Node.js $($release.version) LTS..."
        Invoke-WebRequest -UseBasicParsing -Uri $downloadUrl -OutFile $installerPath

        Write-Host "Verifying the installer..."
        $checksumDocument = (Invoke-WebRequest -UseBasicParsing -Uri "$releaseBaseUrl/SHASUMS256.txt").Content
        $escapedFileName = [regex]::Escape($fileName)
        $checksumLine = ($checksumDocument -split "\r?\n") |
            Where-Object { $_ -match "^[a-fA-F0-9]{64}\s+$escapedFileName$" } |
            Select-Object -First 1
        if (-not $checksumLine) {
            throw "The official checksum for $fileName was not found."
        }

        $expectedHash = ($checksumLine -split "\s+")[0].ToLowerInvariant()
        $actualHash = (Get-FileHash -LiteralPath $installerPath -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($actualHash -ne $expectedHash) {
            throw "The Node.js installer checksum did not match. Installation was stopped."
        }

        Write-Host "Installing Node.js LTS. Windows may request administrator approval..."
        $installerArguments = "/i `"$installerPath`" /qn /norestart"
        $installer = Start-Process `
            -FilePath "msiexec.exe" `
            -ArgumentList $installerArguments `
            -Verb RunAs `
            -Wait `
            -PassThru
        if ($installer.ExitCode -ne 0) {
            throw "The Node.js installer exited with code $($installer.ExitCode)."
        }
    }
    finally {
        if (Test-Path -LiteralPath $installerPath) {
            Remove-Item -LiteralPath $installerPath -Force
        }
    }
}

try {
    Write-Step "Checking Node.js"
    $nodeExecutable = Get-NodeExecutable

    if (-not $nodeExecutable) {
        Install-NodeWithWinget | Out-Null
        $nodeExecutable = Get-NodeExecutable
        if (-not $nodeExecutable) {
            Install-NodeFromOfficialMsi
            $nodeExecutable = Get-NodeExecutable
        }
    }

    if (-not $nodeExecutable) {
        throw "Node.js installation completed, but node.exe could not be found. Restart Windows and run setup.cmd again."
    }

    $nodeDirectory = Split-Path -Parent $nodeExecutable
    $npmExecutable = Join-Path $nodeDirectory "npm.cmd"
    if (-not (Test-Path -LiteralPath $npmExecutable)) {
        throw "npm.cmd was not found beside Node.js at $nodeDirectory."
    }

    # npm scripts invoke `node`, so expose the detected installation to this process.
    $env:Path = "$nodeDirectory;$env:Path"
    Write-Host "Using Node.js $(& $nodeExecutable --version) from $nodeDirectory" -ForegroundColor Green

    Write-Step "Installing project dependencies"
    Set-Location -LiteralPath $projectDirectory
    & $npmExecutable ci --no-audit --fund=false
    if ($LASTEXITCODE -ne 0) {
        throw "npm dependency installation failed with exit code $LASTEXITCODE."
    }

    if (-not $SkipBuild) {
        Write-Step "Building the local interface"
        & $npmExecutable run build
        if ($LASTEXITCODE -ne 0) {
            throw "The interface build failed with exit code $LASTEXITCODE."
        }
    }

    Write-Step "Validating the installation"
    & $npmExecutable run check
    if ($LASTEXITCODE -ne 0) {
        throw "Validation failed with exit code $LASTEXITCODE."
    }

    Write-Host ""
    Write-Host "DM Tool is ready." -ForegroundColor Green
    Write-Host "Use run.cmd whenever you want to start the app."
    exit 0
}
catch {
    Write-Host ""
    Write-Host "Setup failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Check your internet connection and try setup.cmd again."
    exit 1
}
