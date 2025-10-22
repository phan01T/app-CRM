@echo off
echo ========================================
echo    KHOI DONG BACKEND VA CHO DOI
echo ========================================
echo.

echo Dang chuyen den thu muc backend...
cd /d "%~dp0backend\customer-profile-backend"

echo.
echo Dang chay Spring Boot...
echo.
echo ⚠️  LUU Y:
echo - Backend se chay tren: http://localhost:8080
echo - API Leads: http://localhost:8080/api/leads
echo - Cho doi backend khoi dong hoan toan...
echo - Nhan Ctrl+C de dung backend
echo.

start "Backend Console" cmd /k "mvn spring-boot:run"

echo.
echo Dang cho doi backend khoi dong...
echo.

:wait_loop
echo Cho 5 giay...
timeout /t 5 /nobreak >nul

echo Kiem tra port 8080...
netstat -an | findstr :8080 >nul
if %errorlevel% equ 0 (
    echo ✅ Backend da chay tren port 8080!
    echo.
    echo Test API...
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/leads' -Method GET -TimeoutSec 5; Write-Host '✅ API Leads hoat dong! Status:' $response.StatusCode } catch { Write-Host '❌ API chua san sang, cho them...' }"
    echo.
    echo Backend da san sang!
    echo - Backend: http://localhost:8080
    echo - API Leads: http://localhost:8080/api/leads
    echo - Test: Mở file test-api.html trong browser
    echo.
    pause
    exit /b 0
) else (
    echo ❌ Backend chua chay, cho them...
    goto wait_loop
)
