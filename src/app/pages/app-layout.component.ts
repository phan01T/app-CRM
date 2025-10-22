// app-layout.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ExpandableMenuComponent } from '../../sidebar/expandable-menu/expandable-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ExpandableMenuComponent],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  isCollapsed = false;
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Contacts', icon: 'contacts',
      children: [
        { label: 'Leads', route: '/leads' },
        { label: 'Companies', route: '/companies' },
      ],
    },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];
  toggleSidebar() { this.isCollapsed = !this.isCollapsed; }
}
