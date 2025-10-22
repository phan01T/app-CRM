import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { icons } from '../../app/shared/icons';

// import header (chỉnh đường dẫn nếu khác)
import { HeaderComponent } from '../header/header.component';
import {
  ExpandableMenuComponent,
  MenuItem,
} from '../../sidebar/expandable-menu/expandable-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ExpandableMenuComponent],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  isCollapsed = false;
  icons = icons;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'grid', route: '/dashboard' },
    { label: 'Quản lí khách hàng', icon: 'activity', route: '/leads' },
    { label: 'Danh sách', icon: 'book', route: '/contacts' },
    { label: 'Nhân viên', icon: 'users', route: '//employee' },
    { label: 'Cơ hội', icon: 'trending-up', route: '/opportunities' },
    { label: 'Products', icon: 'package', route: '/products' },
    { label: 'Invoices', icon: 'file-text', route: '/invoices' },
    {
      label: 'Calendar',
      icon: 'calendar',
      route: '/calendar',
      children: [
        { label: 'Tasks', route: '/calendar/tasks' },
        { label: 'Activities', route: '/calendar/activities' },
        { label: 'Messages', route: '/calendar/messages' },
      ],
    },

    { label: 'Support', icon: 'life-buoy', route: '/support' },
    { label: 'Email', icon: 'mail', route: '/email' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'System', icon: 'server', route: '/system' },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  changeSidebarTheme(theme: 'blue' | 'purple' | 'green') {
    const root = document.documentElement;
    if (theme === 'blue') {
      root.style.setProperty(
        '--sidebar-bg',
        'linear-gradient(180deg, #eff6ff, #dbeafe)'
      );
      root.style.setProperty(
        '--sidebar-active-bg',
        'linear-gradient(90deg, #3b82f6, #2563eb)'
      );
      root.style.setProperty('--sidebar-hover-bg', '#dbeafe');
    } else if (theme === 'purple') {
      root.style.setProperty(
        '--sidebar-bg',
        'linear-gradient(180deg, #faf5ff, #f3e8ff)'
      );
      root.style.setProperty(
        '--sidebar-active-bg',
        'linear-gradient(90deg, #a855f7, #7e22ce)'
      );
      root.style.setProperty('--sidebar-hover-bg', '#ede9fe');
    } else if (theme === 'green') {
      root.style.setProperty(
        '--sidebar-bg',
        'linear-gradient(180deg, #f0fdf4, #dcfce7)'
      );
      root.style.setProperty(
        '--sidebar-active-bg',
        'linear-gradient(90deg, #10b981, #059669)'
      );
      root.style.setProperty('--sidebar-hover-bg', '#d1fae5');
    }
  }
}
