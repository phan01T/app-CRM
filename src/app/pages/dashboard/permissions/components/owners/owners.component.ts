import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Owner {
  name: string;
  email: string;
  team: string;
  role: string;
  records: string;
  active: boolean;
  avatar: string;
}

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
})
export class OwnersComponent {
  owners: Owner[] = [
    {
      name: 'Linh Nguyen',
      email: 'linh@company.com',
      team: 'Sales - Miền Bắc',
      role: 'Sales',
      records: '258 khách hàng',
      active: true,
      avatar: 'https://i.pravatar.cc/40?img=5',
    },
    {
      name: 'Huy Pham',
      email: 'huy@company.com',
      team: 'Sales - Miền Bắc',
      role: 'Quản lý',
      records: '—',
      active: true,
      avatar: 'https://i.pravatar.cc/40?img=12',
    },
    {
      name: 'Anh Tran',
      email: 'anh@company.com',
      team: 'Vận hành',
      role: 'Admin',
      records: '—',
      active: true,
      avatar: 'https://i.pravatar.cc/40?img=8',
    },
  ];

  // ==== Form trạng thái ====
  showForm = false;
  newTeam = {
    name: '',
    role: '',
    members: '',
  };

  openForm() {
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.newTeam = { name: '', role: '', members: '' };
  }

  saveTeam() {
    if (!this.newTeam.name.trim()) {
      alert('Vui lòng nhập tên đội nhóm');
      return;
    }

    const newOwner: Owner = {
      name: this.newTeam.name,
      email: `${this.newTeam.name
        .toLowerCase()
        .replace(/\s/g, '')}@company.com`,
      team: this.newTeam.name,
      role: this.newTeam.role || 'Nhân viên',
      records: this.newTeam.members || '—',
      active: true,
      avatar:
        'https://i.pravatar.cc/40?img=' + Math.floor(Math.random() * 50 + 1),
    };

    this.owners.push(newOwner);
    this.cancelForm();
  }
}
