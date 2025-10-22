@echo off
echo ========================================
echo    KHOI DONG BACKEND SPRING BOOT
echo ========================================
echo.

echo Dang chuyen den thu muc backend...
cd /d "%~dp0backend\customer-profile-backend"

echo.
echo Dang kiem tra Maven...
mvn --version
if %errorlevel% neq 0 (
    echo LOI: Maven khong tim thay! Vui long cai dat Maven.
    pause
    exit /b 1
)

echo.
echo Dang chay Spring Boot...
echo Backend se chay tren: http://localhost:8080
echo API Leads: http://localhost:8080/api/leads
echo.
echo Nhan Ctrl+C de dung backend
echo.

mvn spring-boot:run

echo.
echo Backend da dung.
pause
