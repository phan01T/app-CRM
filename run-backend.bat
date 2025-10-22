@echo off
echo ========================================
echo    CHAY BACKEND SPRING BOOT
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
echo - Nhan Ctrl+C de dung backend
echo - De lai cua so nay mo de backend chay
echo.

mvn spring-boot:run

echo.
echo Backend da dung.
pause
