# 🚀 Hướng dẫn khởi động MySQL và Backend

## ❌ Vấn đề hiện tại:
- Script gặp lỗi syntax và không thể khởi động MySQL service
- Cần khởi động MySQL thủ công trước khi chạy backend

## 🔧 Cách khởi động MySQL:

### Cách 1: Sử dụng Services (Khuyến nghị)
1. **Nhấn Windows + R**
2. **Gõ:** `services.msc` và Enter
3. **Tìm "MySQL"** trong danh sách
4. **Right-click** → **Start**

### Cách 2: Sử dụng MySQL Workbench
1. **Mở MySQL Workbench**
2. **Kết nối với database** (localhost:3306, root/123456)
3. **MySQL sẽ tự động khởi động**

### Cách 3: Sử dụng Command Prompt (as Administrator)
1. **Mở Command Prompt as Administrator**
2. **Chạy:**
   ```cmd
   net start mysql
   ```

### Cách 4: Sử dụng PowerShell (as Administrator)
1. **Mở PowerShell as Administrator**
2. **Chạy:**
   ```powershell
   Start-Service mysql
   ```

## ✅ Kiểm tra MySQL đã chạy:

Sau khi khởi động MySQL, chạy:
```powershell
.\quick-fix.bat
```

**Kết quả mong đợi:**
```
✅ MySQL dang chay va ket noi thanh cong
✅ Database customer_profile_db ton tai
[Spring Boot logs...]
Started CustomerProfileBackendApplication
```

## 🎯 Sau khi MySQL chạy:

1. **Chạy quick fix:**
   ```powershell
   .\quick-fix.bat
   ```

2. **Hoặc chạy từng bước:**
   ```powershell
   .\test-database.bat
   .\start-backend-wait.bat
   ```

## 🔍 Troubleshooting:

### Lỗi "MySQL service not found"
- MySQL chưa cài đặt
- Cài đặt MySQL từ: https://dev.mysql.com/downloads/mysql/

### Lỗi "Access denied"
- Username/password sai
- Kiểm tra: root/123456

### Lỗi "Port 3306 already in use"
- MySQL đã chạy rồi
- Kiểm tra bằng: `netstat -an | findstr :3306`

## 📋 Checklist:

- [ ] MySQL service đang chạy
- [ ] Có thể kết nối MySQL (root/123456)
- [ ] Database `customer_profile_db` tồn tại
- [ ] Backend khởi động thành công
- [ ] API http://localhost:8080/api/leads hoạt động

## 🎉 Kết quả cuối cùng:

Khi tất cả hoạt động:
- **MySQL:** Chạy trên port 3306
- **Backend:** Chạy trên port 8080
- **API Leads:** http://localhost:8080/api/leads
- **Frontend:** Có thể kết nối và tạo/sửa/xóa leads
