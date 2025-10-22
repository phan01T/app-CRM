import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Consent {
  name: string;
  email: string;
  source: string;
  emailOptIn: string;
  smsOptIn: string;
  time: string;
}

@Component({
  selector: 'app-consent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
})
export class ConsentComponent {
  filterEmail = 'Tất cả';
  filterSms = 'Tất cả';
  filterSource = 'Bất kỳ';

  // ===== Danh sách consent mặc định =====
  consents: Consent[] = [
    {
      name: 'Acme Co',
      email: 'linh@acme.com',
      source: 'Form',
      emailOptIn: 'Có',
      smsOptIn: 'Không',
      time: '2025-03-12 10:20',
    },
    {
      name: 'Globex',
      email: 'ops@globex.com',
      source: 'Email',
      emailOptIn: 'Có',
      smsOptIn: 'Có',
      time: '2025-02-28 16:05',
    },
    {
      name: 'Initech',
      email: 'support@initech.com',
      source: 'Chatbot',
      emailOptIn: 'Không',
      smsOptIn: 'Có',
      time: '2025-01-05 09:44',
    },
  ];

  // ===== Biến nhập dữ liệu mới =====
  newConsent: Partial<Consent> = {
    name: '',
    email: '',
    source: '',
    emailOptIn: '',
    smsOptIn: '',
    time: '',
  };

  showForm = false;
  successMsg = '';

  // ===== Mở form tạo mới =====
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // ===== Lưu consent mới =====
  saveConsent() {
    if (
      !this.newConsent.name ||
      !this.newConsent.email ||
      !this.newConsent.source ||
      !this.newConsent.emailOptIn ||
      !this.newConsent.smsOptIn
    ) {
      alert('⚠️ Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newItem: Consent = {
      name: this.newConsent.name!,
      email: this.newConsent.email!,
      source: this.newConsent.source!,
      emailOptIn: this.newConsent.emailOptIn!,
      smsOptIn: this.newConsent.smsOptIn!,
      time:
        this.newConsent.time ||
        new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    this.consents.unshift(newItem); // thêm vào đầu danh sách

    // reset form
    this.newConsent = {
      name: '',
      email: '',
      source: '',
      emailOptIn: '',
      smsOptIn: '',
      time: '',
    };

    this.showForm = false;
    this.successMsg = '✅ Consent mới đã được lưu!';
    setTimeout(() => (this.successMsg = ''), 2500);
  }
}
