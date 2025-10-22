# 🚀 Hướng dẫn chạy Backend sau khi MySQL đã sẵn sàng

## ✅ MySQL đã khởi tạo thành công!
Tôi thấy bạn đã có:
- Database: `customer_profile_db` 
- MySQL đang chạy
- Có thể kết nối được

## 🎯 Bước tiếp theo: Chạy Backend

### Cách 1: Double-click file (Dễ nhất)
1. Mở File Explorer
2. Đi đến `D:\Projects\my-first-app`
3. **Double-click** vào file `start-backend-simple.bat`

### Cách 2: Từ Command Prompt
1. Mở Command Prompt (Windows + R → cmd)
2. Chạy lệnh:
```cmd
cd D:\Projects\my-first-app
start-backend-simple.bat
```

### Cách 3: Từ PowerShell
1. Mở PowerShell
2. Chạy lệnh:
```powershell
cd D:\Projects\my-first-app
.\start-backend-simple.bat
```

## 🔍 Kiểm tra Backend có chạy không

### Cách 1: Kiểm tra port 8080
Mở Command Prompt và chạy:
```cmd
netstat -an | findstr :8080
```
Nếu thấy `:8080` thì backend đang chạy.

### Cách 2: Test API trong browser
Mở browser và vào:
- http://localhost:8080/api/leads

Nếu thấy dữ liệu JSON thì backend chạy thành công.

### Cách 3: Sử dụng file test
Double-click vào file `test-backend.bat` để test tự động.

## 🎯 Kết quả mong đợi

Khi backend chạy thành công, bạn sẽ thấy:

```
========================================
   KHOI DONG BACKEND SPRING BOOT
========================================

Dang chuyen den thu muc backend...
Dang kiem tra Maven...
Dang chay Spring Boot...
Backend se chay tren: http://localhost:8080
API Leads: http://localhost:8080/api/leads

Nhan Ctrl+C de dung backend

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.5.6)

2024-xx-xx xx:xx:xx.xxx  INFO --- [main] c.e.c.CustomerProfileBackendApplication : Starting CustomerProfileBackendApplication
2024-xx-xx xx:xx:xx.xxx  INFO --- [main] c.e.c.CustomerProfileBackendApplication : No active profile set, falling back to default profiles: default
2024-xx-xx xx:xx:xx.xxx  INFO --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http)
2024-xx-xx xx:xx:xx.xxx  INFO --- [main] c.e.c.CustomerProfileBackendApplication : Started CustomerProfileBackendApplication in x.xxx seconds
```

## 🐛 Nếu gặp lỗi

### Lỗi "Maven không tìm thấy"
- Cài đặt Maven: https://maven.apache.org/download.cgi
- Thêm Maven vào PATH

### Lỗi "Java không tìm thấy"  
- Cài đặt Java 21
- Kiểm tra JAVA_HOME

### Lỗi "Database connection failed"
- Kiểm tra MySQL đang chạy
- Kiểm tra database `customer_profile_db` đã tạo
- Kiểm tra username/password: root/123456

## 🎉 Sau khi Backend chạy thành công

1. **Backend chạy trên**: http://localhost:8080
2. **API Leads**: http://localhost:8080/api/leads
3. **Có thể test**: Mở file `test-api.html` trong browser
4. **Chạy Frontend**: `ng serve` (terminal khác)

## 📞 Cần hỗ trợ?

Nếu vẫn gặp vấn đề, hãy:
1. Chụp màn hình lỗi
2. Gửi log từ console
3. Mô tả các bước đã thực hiện
