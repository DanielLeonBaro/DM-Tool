# DM Tool

A compact, local-first workspace for tabletop campaigns:

- Named combat history, reusable character presets, initiative, conditions, and round notes
- Searchable, linked campaign notes with category and tag filters
- Saved YouTube, Spotify, and web audio sources with category filters

## New computer quickstart

### Windows

1. Copy or extract the project folder onto the Windows computer.
2. Double-click `setup.cmd`.
3. Approve the Windows administrator prompt if Node.js needs to be installed.
4. When setup finishes, double-click `run.cmd`.

### macOS and Linux

1. Open a terminal in the project folder.
2. Run `chmod +x setup-linux-mac.sh run-linux-mac.sh` once.
3. Run `./setup-linux-mac.sh`.
4. When setup finishes, run `./run-linux-mac.sh`.

The setup utility:

- Finds an existing Node.js installation or installs the current Node.js LTS release
- Uses Windows Package Manager on Windows when available
- Uses Homebrew, apt, dnf, yum, or pacman on macOS/Linux when needed
- Installs exact dependencies from `package-lock.json`
- Builds the local Tailwind stylesheet and validates the application

An internet connection is required only for first-time setup.

## Run after setup

On Windows, double-click `run.cmd` or use:

```powershell
.\run.cmd
```

On macOS and Linux, use:

```bash
./run-linux-mac.sh
```

Open [http://localhost:3000](http://localhost:3000).

The launcher finds Node.js even when `npm` is missing from the shell `PATH`
and starts the server.

All campaign data is stored in the browser. Use **Export data** in the app menu to
create a backup you can import on another device.

After editing interface classes, rebuild the local Tailwind bundle with `npm run build`.
