Write-Host "Starting Spring Boot Backend..." -ForegroundColor Green
Set-Location "backend\customer-profile-backend"
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host "Running Maven Spring Boot..." -ForegroundColor Cyan
mvn spring-boot:run
