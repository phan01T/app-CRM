import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Lead {
  id?: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  value: number;
  owner: string;
}

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/api/leads';
  searchText = '';
  showForm = false;
  editingLead: Lead | null = null;
  leads: Lead[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  get filteredLeads(): Lead[] {
    if (!this.searchText) return this.leads;
    const term = this.searchText.toLowerCase();
    return this.leads.filter(
      (l) =>
        l.name.toLowerCase().includes(term) ||
        l.company.toLowerCase().includes(term) ||
        l.email.toLowerCase().includes(term)
    );
  }

  loadLeads() {
    console.log('🔄 Đang tải leads từ:', this.apiUrl);
    this.http.get<Lead[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('✅ Tải leads thành công:', data);
        this.leads = data;
      },
      error: (err) => {
        console.error('❌ Lỗi tải leads:', err);
        console.error('❌ Error details:', err.error);
        console.error('❌ Status:', err.status);
        
        if (err.status === 0) {
          console.error('❌ Backend không chạy hoặc không thể kết nối!');
          alert('❌ Backend không chạy! Vui lòng khởi động backend trước.');
        } else {
          alert(`❌ Lỗi tải dữ liệu: ${err.status} - ${err.message || 'Không xác định'}`);
        }
      },
    });
  }

  addLead() {
    this.editingLead = {
      name: '',
      company: '',
      email: '',
      phone: '',
      status: '-',
      value: 0,
      owner: '',
    };
    this.showForm = true;
  }

  editLead(lead: Lead) {
    this.editingLead = { ...lead };
    this.showForm = true;
  }

  saveLead() {
    if (!this.editingLead) return;
    
    // Validate required fields
    if (!this.editingLead.name || !this.editingLead.email) {
      alert('❌ Vui lòng nhập tên và email!');
      return;
    }

    const method = this.editingLead.id ? 'put' : 'post';
    const url = this.editingLead.id
      ? `${this.apiUrl}/${this.editingLead.id}`
      : this.apiUrl;

    console.log('🔄 Đang lưu lead:', this.editingLead);
    console.log('🌐 URL:', url, 'Method:', method);

    this.http[method](url, this.editingLead).subscribe({
      next: (response) => {
        console.log('✅ Lưu thành công:', response);
        alert('✅ Lưu thành công!');
        this.loadLeads();
        this.cancelForm();
      },
      error: (err) => {
        console.error('❌ Lỗi lưu:', err);
        console.error('❌ Error details:', err.error);
        console.error('❌ Status:', err.status);
        
        if (err.status === 0) {
          alert('❌ Không thể kết nối đến server! Vui lòng kiểm tra backend có đang chạy không.');
        } else if (err.status === 404) {
          alert('❌ API không tìm thấy! Kiểm tra URL API.');
        } else if (err.status === 500) {
          alert('❌ Lỗi server! Kiểm tra log backend.');
        } else {
          alert(`❌ Lỗi ${err.status}: ${err.message || 'Không xác định'}`);
        }
      },
    });
  }

  deleteLead(lead: Lead) {
    if (!confirm('Bạn có chắc muốn xóa?')) return;
    this.http.delete(`${this.apiUrl}/${lead.id}`).subscribe({
      next: () => {
        this.loadLeads();
        alert('🗑️ Đã xóa!');
      },
      error: (err) => console.error('❌ Lỗi xóa:', err),
    });
  }

  cancelForm() {
    this.showForm = false;
    this.editingLead = null;
  }
}
