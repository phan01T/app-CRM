@echo off
echo ========================================
echo    KHAC PHUC MYSQL VA BACKEND
echo ========================================
echo.

echo 1. Kiem tra MySQL service...
sc query mysql >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL service dang chay
) else (
    echo ❌ MySQL service khong chay!
    echo.
    echo Dang khoi dong MySQL service...
    net start mysql
    if %errorlevel% equ 0 (
        echo ✅ MySQL service da khoi dong thanh cong
    ) else (
        echo ❌ Khong the khoi dong MySQL service!
        echo.
        echo Thu cach khac...
        echo Dang khoi dong MySQL bang service...
        sc start mysql
        if %errorlevel% equ 0 (
            echo ✅ MySQL service da khoi dong bang sc
        ) else (
            echo ❌ Khong the khoi dong MySQL!
            echo.
            echo Vui long khoi dong MySQL thu cong:
            echo 1. Mo Services (Windows + R, go services.msc)
            echo 2. Tim MySQL trong danh sach
            echo 3. Right-click va chon Start
            echo.
            pause
            exit /b 1
        )
    )
)

echo.
echo 2. Cho MySQL khoi dong hoan toan...
timeout /t 5 /nobreak >nul

echo.
echo 3. Test ket noi MySQL...
mysql -u root -p123456 -e "SHOW DATABASES;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Ket noi MySQL thanh cong
) else (
    echo ❌ Van khong the ket noi MySQL!
    echo Thu lai sau 10 giay...
    timeout /t 10 /nobreak >nul
    mysql -u root -p123456 -e "SHOW DATABASES;" >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Ket noi MySQL thanh cong (lan 2)
    ) else (
        echo ❌ Van khong the ket noi MySQL!
        echo Kiem tra:
        echo - MySQL co cai dat dung khong
        echo - Username: root
        echo - Password: 123456
        echo - Port: 3306
        pause
        exit /b 1
    )
)

echo.
echo 4. Kiem tra database customer_profile_db...
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
echo 5. Chuyen den thu muc backend...
cd /d "%~dp0backend\customer-profile-backend"

echo.
echo 6. Clean va rebuild project...
echo Dang chay: mvn clean
mvn clean
if %errorlevel% neq 0 (
    echo ❌ Maven clean that bai!
    pause
    exit /b 1
)

echo.
echo 7. Install dependencies...
echo Dang chay: mvn install
mvn install
if %errorlevel% neq 0 (
    echo ❌ Maven install that bai!
    pause
    exit /b 1
)

echo.
echo 8. Chay Spring Boot...
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
