Write-Host "🧙 Iniciando DM Tool..." -ForegroundColor Cyan

# ===== Backend =====
Write-Host "🔮 Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList `
  "-NoExit", `
  "-Command", `
  "cd backend; node server.js"

# ===== Frontend =====
Write-Host "🗺️ Iniciando frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList `
  "-NoExit", `
  "-Command", `
  "cd frontend; python -m http.server 5500"

Write-Host "✅ Todo iniciado" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5500/tracker.html"
Write-Host "Backend:  http://localhost:3001"