param(
    [switch]$InstallOnly
)

$ErrorActionPreference = "Stop"
$projectDirectory = $PSScriptRoot

$nodeCandidates = @(
    (Join-Path $env:ProgramFiles "nodejs\node.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "nodejs\node.exe"),
    (Join-Path $env:LOCALAPPDATA "Programs\nodejs\node.exe")
)

$nodeFromPath = Get-Command node.exe -ErrorAction SilentlyContinue
if ($nodeFromPath) {
    $nodeCandidates = @($nodeFromPath.Source) + $nodeCandidates
}

$nodeExecutable = $nodeCandidates |
    Where-Object { $_ -and (Test-Path -LiteralPath $_) } |
    Select-Object -First 1

if (-not $nodeExecutable) {
    Write-Host ""
    Write-Host "Node.js is required but was not found." -ForegroundColor Red
    Write-Host "Run setup.cmd to install and configure everything automatically."
    exit 1
}

$nodeDirectory = Split-Path -Parent $nodeExecutable
$npmExecutable = Join-Path $nodeDirectory "npm.cmd"

if (-not (Test-Path -LiteralPath $npmExecutable)) {
    Write-Host "npm was not found beside Node.js at $nodeDirectory." -ForegroundColor Red
    Write-Host "Run setup.cmd to repair the installation."
    exit 1
}

# npm scripts call `node` internally, so make the discovered installation
# available only to this launcher process and the app it starts.
$env:Path = "$nodeDirectory;$env:Path"
Set-Location -LiteralPath $projectDirectory

Write-Host "Using $(& $nodeExecutable --version) from $nodeDirectory" -ForegroundColor DarkGray

if (-not (Test-Path -LiteralPath (Join-Path $projectDirectory "node_modules\express"))) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    & $npmExecutable ci --no-audit --fund=false
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Dependency installation failed." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

if ($InstallOnly) {
    Write-Host "Dependencies are ready." -ForegroundColor Green
    exit 0
}

Write-Host "DM Tool is running at http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop it." -ForegroundColor DarkGray
& $nodeExecutable (Join-Path $projectDirectory "backend\server.js")
