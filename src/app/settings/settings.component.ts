import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ToggleSwitchComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  // Quản lý tab hiện tại
  activeTab = signal('Chung');

  // Danh sách tab bên trái
  menuItems = [
    'Chung',
    'Người dùng & Quyền',
    'Email & SMTP',
    'Quyền & Đồng ý',
    'Hóa đơn & Thuế',
    'Tích hợp',
    'Bảo mật',
  ];

  // Tín hiệu của các toggle động
  toggles = {
    marketingConsent: signal(true),
    autoLinkLeads: signal(false),
    ownerSync: signal(true),
    hideSensitiveData: signal(false),
  };

  // Chuyển tab
  setTab(tab: string) {
    this.activeTab.set(tab);
  }
}
