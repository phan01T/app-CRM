# 🐛 Khắc phục lỗi Leads API không chạy được

## ❌ Vấn đề hiện tại:
- Maven build thành công nhưng leads API không hoạt động
- Có thể do: Backend chưa khởi động hoàn toàn, database không kết nối, hoặc API có lỗi

## 🔧 Các bước khắc phục theo thứ tự:

### Bước 1: Test Database Connection
```cmd
cd D:\Projects\my-first-app
test-database.bat
```

**Mục đích:** Đảm bảo MySQL và database `customer_profile_db` hoạt động

### Bước 2: Debug Leads API
```cmd
cd D:\Projects\my-first-app
debug-leads-api.bat
```

**Mục đích:** Kiểm tra chi tiết API có hoạt động không

### Bước 3: Khởi động Backend và chờ đợi
```cmd
cd D:\Projects\my-first-app
start-backend-wait.bat
```

**Mục đích:** Khởi động backend và chờ đợi nó khởi động hoàn toàn

### Bước 4: Test thủ công
1. **Kiểm tra port 8080:**
   ```cmd
   netstat -an | findstr :8080
   ```

2. **Test API trong browser:**
   - Mở: http://localhost:8080/api/leads
   - Nếu thấy dữ liệu JSON → Thành công!

3. **Test bằng file:**
   - Mở file `test-api.html` trong browser

## 🐛 Các lỗi thường gặp và cách khắc phục:

### Lỗi 1: "Database connection failed"
**Triệu chứng:** Backend khởi động nhưng API trả về lỗi 500
**Giải pháp:**
```cmd
# Kiểm tra MySQL
mysql -u root -p123456 -e "SHOW DATABASES;"

# Tạo database nếu chưa có
mysql -u root -p123456 -e "CREATE DATABASE IF NOT EXISTS customer_profile_db;"
```

### Lỗi 2: "Port 8080 already in use"
**Triệu chứng:** Backend không thể khởi động
**Giải pháp:**
```cmd
# Tìm process đang dùng port 8080
netstat -ano | findstr :8080

# Kill process (thay <PID> bằng PID thực tế)
taskkill /PID <PID> /F
```

### Lỗi 3: "API not found (404)"
**Triệu chứng:** Backend chạy nhưng API trả về 404
**Giải pháp:**
- Kiểm tra URL: http://localhost:8080/api/leads (không phải /api/customers)
- Kiểm tra LeadController có @RequestMapping("/api/leads") không

### Lỗi 4: "CORS error"
**Triệu chứng:** Frontend không thể gọi API
**Giải pháp:**
- Backend đã có @CrossOrigin(origins = "*")
- Kiểm tra frontend đang chạy trên port khác (4200)

## ✅ Checklist kiểm tra:

- [ ] MySQL đang chạy
- [ ] Database `customer_profile_db` tồn tại
- [ ] Backend khởi động thành công (thấy "Started CustomerProfileBackendApplication")
- [ ] Port 8080 đang được sử dụng
- [ ] API http://localhost:8080/api/leads trả về dữ liệu JSON
- [ ] Không có lỗi đỏ trong console backend

## 🎯 Sau khi khắc phục thành công:

1. **Backend chạy ổn định** trên port 8080
2. **API Leads hoạt động** tại http://localhost:8080/api/leads
3. **Frontend có thể kết nối** và tạo/sửa/xóa leads
4. **Database lưu trữ dữ liệu** thành công

## 📞 Nếu vẫn không được:

1. **Chạy tất cả script debug:**
   ```cmd
   test-database.bat
   debug-leads-api.bat
   start-backend-wait.bat
   ```

2. **Gửi thông tin:**
   - Screenshot console backend
   - Kết quả của các script debug
   - Log lỗi chi tiết

3. **Kiểm tra thêm:**
   - Java version: `java -version`
   - Maven version: `mvn --version`
   - MySQL version: `mysql --version`
