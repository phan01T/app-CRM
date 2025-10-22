

import { icons } from '../app/shared/icons'; 
import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem, Theme, Variant } from './menu.model';
import { ExpandableMenuComponent } from './expandable-menu/expandable-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ExpandableMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() theme: Theme = 'dark';
  @Input() open: boolean = false; // sidebar open/closed state

  variant = signal<Variant>('expanded');
  // Logo/text
  brand = 'Fazil';
  icons = icons;

  // Menu data
  items: MenuItem[] = [
  { label: 'Dashboard', icon:'grid', route: '/dashboard' },
  { label: 'Quản lí khách hàng', icon: 'activity', route: '/leads' },
  { label: 'Cơ hội', icon: 'kanban', route: '/opportunities' },
  { label: 'Danh sách', icon: 'calendar', route: '/contacts' },
  { label: 'Công ty', icon: 'users-plus', route: '/companies' },
  { label: 'Sản phẩm', icon: 'package', route: '/products' },
  { label: 'Báo giá', icon: 'file-text', route: '/invoices' },
  {
    label: 'Hoạt động', icon: 'megaphone',
    children: [
      { label: 'Lịch hẹn', icon: 'calendar', route: '/calendar' },
      { label: 'Quản lý công việc', icon: 'check-square', route: '/calendar/tasks' },
      { label: 'Activities', icon: 'activity', route: '/calendar/activities' },
      { label: 'Messages', icon: 'message-circle', route: '/calendar/messages' },
    ],
  },
  { label: 'Hỗ trợ', icon: 'life-buoy', route: '/support' },
  { label: 'Webmail', icon: 'mail', route: '/email' },
  { label: 'Settings', icon: 'settings', route: '/settings' },
  { label: 'Hệ thống', icon: 'server', route: '/system' },
];



  isCollapsed = computed(() => this.variant() === 'collapsed');

  toggleSidebar() {
    this.variant.set(this.variant() === 'collapsed' ? 'expanded' : 'collapsed');
  }
}
