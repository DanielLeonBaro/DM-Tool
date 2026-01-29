Write-Host "🧙 Iniciando DM Tool"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn backend.main:app --reload"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; node server.js"

Write-Host "Frontend: http://localhost:8000/tracker.html"
Write-Host "Backend: http://localhost:3001"