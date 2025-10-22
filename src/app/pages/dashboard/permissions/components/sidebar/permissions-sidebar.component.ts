import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions-sidebar.component.html',
  styleUrls: ['./permissions-sidebar.component.scss'],
})
export class PermissionsSidebarComponent {
  defaultOwner = 'Luân phiên (Sales)';
  unassigned = 'Gán cho Trưởng nhóm';
  emailOpt = 'Opt-out';
  smsOpt = 'Opt-out';
  retention = '36 tháng';
}
