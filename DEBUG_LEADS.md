# 🐛 Debug: Leads không lưu được

## Vấn đề: "Create nhưng không lưu được"

### 🔍 Các bước kiểm tra:

#### 1. Kiểm tra Backend có chạy không?
```bash
# Chạy script khởi động backend
start-backend-simple.bat
```

**Kiểm tra:**
- Backend chạy trên http://localhost:8080
- Không có lỗi trong console
- Thấy message "Started CustomerProfileBackendApplication"

#### 2. Kiểm tra Database
```sql
-- Kết nối MySQL và kiểm tra
SHOW DATABASES;
USE customer_profile_db;
SHOW TABLES;
SELECT * FROM leads;
```

#### 3. Test API trực tiếp
Mở file `test-api.html` trong browser và test:
- GET /api/leads
- POST /api/leads

#### 4. Kiểm tra Console Browser
1. Mở Developer Tools (F12)
2. Vào tab Console
3. Thử tạo lead mới
4. Xem log lỗi (nếu có)

### 🛠️ Các lỗi thường gặp:

#### Lỗi 1: "Backend không chạy"
**Triệu chứng:** Status 0, không kết nối được
**Giải pháp:**
```bash
cd backend/customer-profile-backend
mvn clean install
mvn spring-boot:run
```

#### Lỗi 2: "Database không kết nối"
**Triệu chứng:** Status 500, lỗi database
**Giải pháp:**
1. Cài đặt MySQL
2. Tạo database: `CREATE DATABASE customer_profile_db;`
3. Kiểm tra username/password trong application.properties

#### Lỗi 3: "CORS Error"
**Triệu chứng:** CORS policy error
**Giải pháp:** Backend đã có `@CrossOrigin(origins = "*")`

#### Lỗi 4: "Validation Error"
**Triệu chứng:** Status 400, validation failed
**Giải pháp:** Kiểm tra các field bắt buộc (name, email)

### 🔧 Debug Code đã cải thiện:

#### Function saveLead():
- ✅ Validate required fields (name, email)
- ✅ Log chi tiết request/response
- ✅ Thông báo lỗi rõ ràng theo từng loại lỗi

#### Function loadLeads():
- ✅ Log chi tiết quá trình tải dữ liệu
- ✅ Thông báo lỗi khi backend không chạy

### 📋 Checklist Debug:

- [ ] Backend đang chạy trên port 8080
- [ ] MySQL đang chạy và có database customer_profile_db
- [ ] Không có lỗi trong console backend
- [ ] Không có lỗi CORS trong browser console
- [ ] Các field bắt buộc (name, email) đã nhập
- [ ] API URL đúng: http://localhost:8080/api/leads

### 🚀 Cách test nhanh:

1. **Chạy Backend:**
   ```bash
   start-backend-simple.bat
   ```

2. **Chạy Frontend:**
   ```bash
   ng serve
   ```

3. **Test trong Browser:**
   - Mở http://localhost:4200
   - Vào trang Leads
   - Mở Developer Tools (F12)
   - Thử tạo lead mới
   - Xem log trong Console

### 📞 Nếu vẫn lỗi:

Gửi thông tin sau:
1. Screenshot console browser
2. Screenshot console backend
3. Log lỗi chi tiết
4. Các bước đã thực hiện
