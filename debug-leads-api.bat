@echo off
echo ========================================
echo    DEBUG LEADS API
echo ========================================
echo.

echo 1. Kiem tra port 8080...
netstat -an | findstr :8080
if %errorlevel% equ 0 (
    echo ✅ Port 8080 dang duoc su dung
) else (
    echo ❌ Port 8080 khong duoc su dung - Backend chua chay
    echo.
    echo Dang chay backend...
    cd /d "%~dp0backend\customer-profile-backend"
    start "Backend" cmd /k "mvn spring-boot:run"
    echo.
    echo Cho 30 giay de backend khoi dong...
    timeout /t 30 /nobreak
)

echo.
echo 2. Test API endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/leads' -Method GET -TimeoutSec 10; Write-Host '✅ API tra ve:' $response.StatusCode; Write-Host 'Data:' $response.Content } catch { Write-Host '❌ Loi API:' $_.Exception.Message }"

echo.
echo 3. Test root endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080' -Method GET -TimeoutSec 10; Write-Host '✅ Root endpoint tra ve:' $response.StatusCode } catch { Write-Host '❌ Loi root endpoint:' $_.Exception.Message }"

echo.
echo 4. Kiem tra database connection...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/leads' -Method GET -TimeoutSec 10; if ($response.StatusCode -eq 200) { Write-Host '✅ Database ket noi thanh cong!' } else { Write-Host '❌ Database co loi:' $response.StatusCode } } catch { Write-Host '❌ Khong the ket noi database' }"

echo.
echo 5. Test POST API...
$testLead = @{
    name = "Test Lead $(Get-Date -Format 'yyyyMMddHHmmss')"
    company = "Test Company"
    email = "test@example.com"
    phone = "0901234567"
    status = "Mới"
    value = 1000000
    owner = "Test Owner"
} | ConvertTo-Json

powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/leads' -Method POST -Body '$testLead' -ContentType 'application/json' -TimeoutSec 10; Write-Host '✅ POST API tra ve:' $response.StatusCode; Write-Host 'Created:' $response.Content } catch { Write-Host '❌ Loi POST API:' $_.Exception.Message }"

echo.
echo ========================================
echo    KET QUA DEBUG
echo ========================================
echo.
echo Neu co loi, vui long:
echo 1. Kiem tra console backend co loi gi khong
echo 2. Kiem tra database MySQL co chay khong
echo 3. Kiem tra database customer_profile_db co ton tai khong
echo 4. Kiem tra username/password: root/123456
echo.
pause
