Write-Host "🧙 Iniciando DM Tool"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn backend.main:app --reload"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; node server.js"

Write-Host "Music: http://localhost:8000/music.html"
Write-Host "Tracker: http://localhost:8000/tracker.html"
Write-Host "Wiki: http://localhost:8000/wiki.html"
Write-Host "Backend: http://localhost:3001"