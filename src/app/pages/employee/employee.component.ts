import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvitationComponent } from '../invitation/invitation.component';
import { RouterModule } from '@angular/router';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  lastActive: string;
  mobileApp: string;
  desktopApp: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, InvitationComponent, RouterModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeesComponent {
  searchText = '';
  showInvitation = false; //status modal

  openInvitation() {
    this.showInvitation = true;
  }
  closeInvitation() {
    this.showInvitation = false;
  }

  employees: Employee[] = [
    {
      id: 1,
      name: 'Phan Thắng',
      email: 'phan0101xm@gmail.com',
      phone: '0988-123-456',
      department: 'CNTT',
      lastActive: '01/10/2025, 10:54 am',
      mobileApp: 'Đã cài',
      desktopApp: 'Chưa cài đặt',
      role: 'Quản trị viên',
      avatar: '',
    },
    {
      id: 2,
      name: 'Nguyễn Lan',
      email: 'lan.nguyen@example.com',
      phone: '0912-345-678',
      department: 'Kế toán',
      lastActive: '30/09/2025, 4:20 pm',
      mobileApp: 'Chưa cài đặt',
      desktopApp: 'Đã cài',
      role: 'Nhân viên',
      avatar: 'https://i.pravatar.cc/40?img=2',
    },
    {
      id: 3,
      name: 'Trần Minh',
      email: 'minh.tran@example.com',
      phone: '0909-888-777',
      department: 'Kinh doanh',
      lastActive: '29/09/2025, 9:00 am',
      mobileApp: 'Đã cài',
      desktopApp: 'Đã cài',
      role: 'Trưởng phòng',
      avatar: 'https://i.pravatar.cc/40?img=3',
    },
  ];

  get filteredEmployees() {
    if (!this.searchText) return this.employees;
    const term = this.searchText.toLowerCase();
    return this.employees.filter(
      (e) =>
        e.name.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term) ||
        e.department.toLowerCase().includes(term)
    );
  }
}
