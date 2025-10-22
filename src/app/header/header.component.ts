import { icons } from './../shared/icons';
import {
  Component,
  signal,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/guards/auth.service';

interface NavItem {
  label: string; // Tên hiển thị
  route?: string; // Đường dẫn RouterLink
  locked?: boolean; // Nếu true => bị khóa, hiển thị mờ
  icon?: string; // Biểu tượng (emoji hoặc tên icon)
  isGroup?: boolean; // Đánh dấu đây là một nhóm (hiển thị tiêu đề)
  hasDropdown?: boolean; // Có menu con hay không
  isActive?: boolean; // Đang active
  children?: NavItem[]; // Danh sách menu con
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  /** ======================
   *  THUỘC TÍNH CHÍNH
   *  ====================== */
  brandName = 'Modernize';
  helpNotifications = signal(5);

  // Trạng thái menu
  isMainMenuOpen = signal(false);
  activeDropdown = signal<string | null>(null);
  isProfileMenuOpen = signal(false);

  // Ngôn ngữ & Giao diện
  lang = signal<'vi' | 'en'>('vi');
  darkMode = signal(false);

  /** ======================
   *  CẤU HÌNH MENU
   *  ====================== */
  navItems: NavItem[] = [
    {
      label: 'Kho',
      route: '/warehouse',
      hasDropdown: true,
      children: [
        { label: 'Danh mục sản phẩm', route: '/warehouse/categories' },
        { label: 'Quản lý kho hàng', route: '/warehouse/inventory' },
      ],
    },
    {
      label: 'Khách hàng',
      route: '/customers',
      hasDropdown: true,
      children: [
        { label: 'Các liên lạc', route: '/customers/contacts' },
        { label: 'Các công ty', route: '/customers/companies' },
        {
          label: 'Các bên ký kết',
          route: '/customers/partners',
          children: [
            {
              label: 'Đối tác chiến lược',
              route: '/customers/partners/strategic',
            },
            {
              label: 'Đại lý phân phối',
              route: '/customers/partners/distributors',
            },
          ],
        },
        {
          label: 'Nhà cung cấp',
          route: '/customers/suppliers',
          children: [
            { label: 'Danh sách NCC', route: '/customers/suppliers/list' },
            { label: 'Thêm NCC mới', route: '/customers/suppliers/create' },
          ],
        },
        { label: 'Trung tâm Liên hệ', route: '/customers/contact-center' },
      ],
    },
    {
      label: 'Bán hàng',
      route: '/sales',
      hasDropdown: true,
      children: [
        { label: 'Đơn hàng', route: '/sales/orders' },
        { label: 'Báo giá', route: '/sales/quotes' },
        { label: 'Chiến dịch', route: '/sales/campaigns' },
      ],
    },
    {
      label: 'Phân tích',
      route: '/analytics',
      hasDropdown: true,
      children: [
        {
          label: 'Phân tích trong thời gian thực',
          route: '/analytics/realtime',
        },
        { label: 'BI Builder', route: '/analytics/builder' },
      ],
    },
    {
      label: 'Thêm',
      route: '/more',
      hasDropdown: true,
      children: [
        // --- Nhóm 1: Tự động hóa ---
        {
          label: 'Tự động hóa quy trình thông minh',
          route: '/more/automation',
          children: [
            { label: 'Kịch bản tự động', route: '/more/automation/scenarios' },
            { label: 'Thiết lập trigger', route: '/more/automation/triggers' },
            {
              label: 'Quy trình làm việc',
              route: '/more/automation/workflows',
            },
          ],
        },

        // --- Nhóm 2: Cài đặt ---
        {
          label: 'Các cài đặt',
          route: '/more/settings',
          isGroup: true,
          children: [
            {
              label: 'Cài đặt',
              route: '/more/settings/general',
              locked: true, // hiển thị mờ, không click được
            },
            {
              label: 'Cấu hình menu',
              route: '/more/settings/menu',
              icon: '⚙️',
            },
            { label: 'Đặt lại menu', route: '/more/settings/reset' },
          ],
        },

        // --- Divider giữa các nhóm ---
        { label: 'divider' },

        // --- Nhóm 3: Ẩn ---
        {
          label: 'Ẩn',
          route: '/more/hidden',
          isGroup: true,
          children: [
            {
              label: 'Khách hàng tiềm năng',
              route: '/more/hidden/leads',
              locked: true,
            },
            {
              label: 'Các hoạt động của tôi',
              route: '/more/hidden/my-activities',
            },
            {
              label: 'Lịch sử',
              route: '/more/hidden/history',
              locked: true,
            },
            { label: 'Thùng Rác', route: '/more/hidden/trash' },
          ],
        },
      ],
    },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  /** ======================
   *  XỬ LÝ MENU CHÍNH
   *  ====================== */
  setActiveItem(item: NavItem) {
    this.navItems.forEach((nav) => (nav.isActive = false));
    item.isActive = true;
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleMainMenu() {
    this.isMainMenuOpen.set(!this.isMainMenuOpen());
  }

  toggleDropdown(itemLabel: string) {
    const current = this.activeDropdown();
    this.activeDropdown.set(current === itemLabel ? null : itemLabel);
  }

  closeAllDropdowns() {
    this.activeDropdown.set(null);
  }

  /** ======================
   *  PROFILE MENU
   *  ====================== */
  toggleProfileMenu() {
    this.isProfileMenuOpen.update((v) => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.header')) {
      this.isProfileMenuOpen.set(false);
      this.closeAllDropdowns();
    }
  }

  /** ======================
   *  NGÔN NGỮ & GIAO DIỆN
   *  ====================== */
  toggleLang(lang: 'vi' | 'en') {
    this.lang.set(lang);
    console.log('Language changed to:', lang);
  }

  //darkmode
  toggleDarkMode() {
    const newMode = !this.darkMode();
    this.darkMode.set(newMode);
    document.body.classList.toggle('dark-theme', newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  }

  ngOnInit() {
    const saved = localStorage.getItem('darkMode');
    if (saved && JSON.parse(saved)) {
      this.darkMode.set(true);
      document.body.classList.add('dark-theme');
    }
  }

  /** ======================
   *  ĐĂNG XUẤT & HÀNH ĐỘNG
   *  ====================== */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  close() {
    this.isProfileMenuOpen.set(false);
  }

  save() {
    console.log('Saved settings', {
      lang: this.lang(),
      dark: this.darkMode(),
    });
    this.isProfileMenuOpen.set(false);
  }
}
