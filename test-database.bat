@echo off
echo ========================================
echo    TEST DATABASE CONNECTION
echo ========================================
echo.

echo 1. Kiem tra MySQL service...
sc query mysql >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL service dang chay
) else (
    echo ❌ MySQL service khong chay!
    echo Vui long khoi dong MySQL service
    pause
    exit /b 1
)

echo.
echo 2. Test ket noi MySQL...
mysql -u root -p123456 -e "SHOW DATABASES;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Ket noi MySQL thanh cong
) else (
    echo ❌ Khong the ket noi MySQL!
    echo Kiem tra:
    echo - MySQL co chay khong
    echo - Username: root
    echo - Password: 123456
    pause
    exit /b 1
)

echo.
echo 3. Kiem tra database customer_profile_db...
mysql -u root -p123456 -e "USE customer_profile_db; SHOW TABLES;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Database customer_profile_db ton tai
) else (
    echo ❌ Database customer_profile_db khong ton tai!
    echo Dang tao database...
    mysql -u root -p123456 -e "CREATE DATABASE IF NOT EXISTS customer_profile_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Da tao database customer_profile_db
    ) else (
        echo ❌ Khong the tao database!
        pause
        exit /b 1
    )
)

echo.
echo 4. Kiem tra bang leads...
mysql -u root -p123456 -e "USE customer_profile_db; DESCRIBE leads;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Bang leads ton tai
) else (
    echo ❌ Bang leads khong ton tai!
    echo Backend se tu dong tao bang khi chay
)

echo.
echo 5. Test du lieu mau...
mysql -u root -p123456 -e "USE customer_profile_db; SELECT COUNT(*) as lead_count FROM leads;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Co the truy van du lieu
) else (
    echo ❌ Khong the truy van du lieu
)

echo.
echo ========================================
echo    KET QUA TEST DATABASE
echo ========================================
echo.
echo Database da san sang cho backend!
echo.
echo Bay gio chay backend:
echo start-backend-wait.bat
echo.
pause
