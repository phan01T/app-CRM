@echo off
echo ========================================
echo    QUICK FIX - KHOI DONG MYSQL VA BACKEND
echo ========================================
echo.

echo 1. Kiem tra MySQL...
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL da cai dat
) else (
    echo ❌ MySQL chua cai dat!
    echo Vui long cai dat MySQL truoc
    pause
    exit /b 1
)

echo.
echo 2. Test ket noi MySQL...
mysql -u root -p123456 -e "SHOW DATABASES;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL dang chay va ket noi thanh cong
) else (
    echo ❌ MySQL chua chay hoac khong ket noi duoc!
    echo.
    echo VUI LONG KHOI DONG MYSQL TRUOC:
    echo.
    echo CACH 1: Services
    echo - Nhan Windows + R
    echo - Go: services.msc
    echo - Tim "MySQL" va Start
    echo.
    echo CACH 2: MySQL Workbench
    echo - Mo MySQL Workbench
    echo - Ket noi voi database
    echo.
    echo CACH 3: Command Prompt (as Administrator)
    echo - Mo Command Prompt as Administrator
    echo - Chay: net start mysql
    echo.
    echo Sau khi MySQL chay, chay lai script nay
    pause
    exit /b 1
)

echo.
echo 3. Kiem tra database...
mysql -u root -p123456 -e "USE customer_profile_db; SHOW TABLES;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Database customer_profile_db ton tai
) else (
    echo ❌ Database customer_profile_db khong ton tai!
    echo Dang tao database...
    mysql -u root -p123456 -e "CREATE DATABASE IF NOT EXISTS customer_profile_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Da tao database customer_profile_db
    ) else (
        echo ❌ Khong the tao database!
        pause
        exit /b 1
    )
)

echo.
echo 4. Chuyen den thu muc backend...
cd /d "%~dp0backend\customer-profile-backend"

echo.
echo 5. Chay Spring Boot...
echo Dang chay: mvn spring-boot:run
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
