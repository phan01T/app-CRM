import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'; // ✅ dùng thay cho toPromise()

interface CustomerProfile {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  tax?: string;
  industry?: string;
  size?: string;
  type: string; // CONTACT / COMPANY
  locked?: boolean;
  attachments?: string[];
  [key: string]: any;
}

interface FileItem {
  name: string;
  size: string;
  time: string;
  file?: File;
}

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.scss'],
})
export class CustomerProfileComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/api/customers';
  private uploadUrl = 'http://localhost:8080/api/upload';

  profileForm: FormGroup;
  activeTab: 'contact' | 'company' = 'contact';

  editingContact?: CustomerProfile;
  editingCompany?: CustomerProfile;

  fieldsContact = [
    { key: 'name', label: 'Họ tên' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Điện thoại' },
    { key: 'company', label: 'Công ty' },
  ];

  fieldsCompany = [
    { key: 'name', label: 'Tên công ty' },
    { key: 'tax', label: 'Mã số thuế' },
    { key: 'industry', label: 'Ngành nghề' },
    { key: 'size', label: 'Quy mô' },
  ];

  contacts: CustomerProfile[] = [];
  companies: CustomerProfile[] = [];
  filteredContacts: CustomerProfile[] = [];
  filteredCompanies: CustomerProfile[] = [];
  searchText = '';
  files: FileItem[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      id: [null],
      name: [''],
      email: [''],
      phone: [''],
      company: [''],
      tax: [''],
      industry: [''],
      size: [''],
      type: ['CONTACT'],
      locked: [false],
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  /** 📦 Tải danh sách khách hàng */
  loadCustomers(): void {
    this.http.get<CustomerProfile[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.contacts = data.filter((c) => c.type === 'CONTACT');
        this.companies = data.filter((c) => c.type === 'COMPANY');
        this.filteredContacts = [...this.contacts];
        this.filteredCompanies = [...this.companies];
      },
      error: (err) => console.error('❌ Lỗi tải dữ liệu:', err),
    });
  }

  /** 💾 Lưu dữ liệu + upload file */
  async save(): Promise<void> {
    const data = this.profileForm.value as CustomerProfile;
    data.type = this.activeTab.toUpperCase();

    if (!data.name || data.name.trim() === '') {
      alert('⚠️ Vui lòng nhập tên!');
      return;
    }

    console.log('📤 Dữ liệu gửi:', data);

    try {
      // Upload file nếu có
      if (this.files.length > 0) {
        const formData = new FormData();
        this.files.forEach((f) => f.file && formData.append('files', f.file));
        const uploaded = await firstValueFrom(
          this.http.post<string[]>(this.uploadUrl, formData)
        );
        if (uploaded) data.attachments = uploaded;
      }

      // POST (thêm mới) hoặc PUT (cập nhật)
      if (data.id) {
        await firstValueFrom(this.http.put(`${this.apiUrl}/${data.id}`, data));
        alert('✅ Cập nhật thành công!');
      } else {
        await firstValueFrom(this.http.post(this.apiUrl, data));
        alert('✅ Thêm mới thành công!');
      }

      this.profileForm.reset({
        type: this.activeTab.toUpperCase(),
        locked: false,
      });
      this.files = [];
      this.loadCustomers();
    } catch (err: any) {
      console.error('❌ Lỗi khi lưu hoặc upload:', err);
      alert(
        '⚠️ Có lỗi xảy ra khi lưu dữ liệu! Kiểm tra console để biết chi tiết.'
      );
    }
  }

  /** ❌ Xóa khách hàng */
  delete(item: CustomerProfile): void {
    if (confirm('Bạn có chắc muốn xóa bản ghi này?')) {
      this.http.delete(`${this.apiUrl}/${item.id}`).subscribe({
        next: () => {
          alert('🗑️ Đã xóa thành công!');
          this.loadCustomers();
        },
        error: (err) => {
          console.error('❌ Lỗi khi xóa:', err);
          alert('⚠️ Không thể xóa bản ghi!');
        },
      });
    }
  }

  /** ⚙️ Xử lý hành động CRUD */
  handleAction(action: string, item?: any): void {
    switch (action) {
      case 'create':
        this.profileForm.reset({ type: this.activeTab.toUpperCase() });
        this.editingContact = undefined;
        this.editingCompany = undefined;
        break;

      case 'edit':
        this.profileForm.patchValue(item);
        if (item.type === 'CONTACT') this.editingContact = item;
        if (item.type === 'COMPANY') this.editingCompany = item;
        break;

      case 'delete':
        item && this.delete(item);
        break;
    }
  }

  /** 📁 Khi chọn file */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => {
        const newFile: FileItem = {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          time: new Date().toLocaleString(),
          file,
        };
        this.files.push(newFile);
      });
    }
  }

  /** 🗑 Xóa file */
  removeFile(index: number): void {
    this.files.splice(index, 1);
  }
}
