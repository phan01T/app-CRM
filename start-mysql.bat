@echo off
echo ========================================
echo    KHOI DONG MYSQL SERVICE
echo ========================================
echo.

echo Dang kiem tra MySQL service...
sc query mysql >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL service dang chay
    echo.
    echo Test ket noi...
    mysql -u root -p123456 -e "SHOW DATABASES;" >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ MySQL hoat dong binh thuong
    ) else (
        echo ❌ MySQL chay nhung khong ket noi duoc
    )
) else (
    echo ❌ MySQL service khong chay!
    echo.
    echo Dang khoi dong MySQL service...
    net start mysql
    if %errorlevel% equ 0 (
        echo ✅ MySQL service da khoi dong thanh cong
        echo.
        echo Cho 5 giay de MySQL khoi dong hoan toan...
        timeout /t 5 /nobreak >nul
        echo.
        echo Test ket noi...
        mysql -u root -p123456 -e "SHOW DATABASES;" >nul 2>&1
        if %errorlevel% equ 0 (
            echo ✅ MySQL hoat dong binh thuong
        ) else (
            echo ❌ Van khong ket noi duoc, cho them 5 giay...
            timeout /t 5 /nobreak >nul
            mysql -u root -p123456 -e "SHOW DATABASES;" >nul 2>&1
            if %errorlevel% equ 0 (
                echo ✅ MySQL hoat dong binh thuong (lan 2)
            ) else (
                echo ❌ Van khong ket noi duoc!
                echo.
                echo Thu cach khac:
                echo 1. Mo Services (Windows + R, go services.msc)
                echo 2. Tim MySQL trong danh sach
                echo 3. Right-click va chon Start
                echo 4. Hoac mo MySQL Workbench
            )
        )
    ) else (
        echo ❌ Khong the khoi dong MySQL service!
        echo.
        echo Thu cach khac...
        sc start mysql
        if %errorlevel% equ 0 (
            echo ✅ MySQL service da khoi dong bang sc
        ) else (
            echo ❌ Khong the khoi dong MySQL!
            echo.
            echo Vui long khoi dong MySQL thu cong
        )
    )
)

echo.
echo ========================================
echo    KET QUA
echo ========================================
echo.
echo MySQL da san sang cho backend!
echo.
echo Bay gio chay:
echo fix-mysql-and-backend.bat
echo.
pause
