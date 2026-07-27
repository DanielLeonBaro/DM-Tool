@echo off
setlocal
title DM Tool Setup

echo.
echo  DM Tool - First-time setup
echo  ==========================
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup.ps1"
set "setup_exit=%errorlevel%"

echo.
if not "%setup_exit%"=="0" (
    echo Setup did not complete. Review the error above.
) else (
    echo Setup complete. You can now double-click run.cmd.
)
echo.
pause
exit /b %setup_exit%
