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
  activeTab = signal('Chung');

  menuItems = [
    'Chung',
    'Người dùng & Quyền',
    'Email & SMTP',
    'Quyền & Đồng ý',
    'Hóa đơn & Thuế',
    'Tích hợp',
    'Bảo mật',
  ];

  // ✅ Toggle signals (dynamic)
  toggles = {
    marketingConsent: signal(true),
    autoLinkLeads: signal(false),
    ownerSync: signal(true),
    hideSensitiveData: signal(false),
  };

  setTab(tab: string) {
    this.activeTab.set(tab);
  }
}
