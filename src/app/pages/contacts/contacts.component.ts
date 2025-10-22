import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  avatar: string;
  owner: string;
  role: string;
  department: string;
  email: string;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  /** ===============================
   *  🧾 Hồ sơ khách hàng
   * =============================== */
  showModal = false;
  profileForm!: FormGroup;
  profiles: any[] = [];
  selectedEmployees: Employee[] = [];

  /** ===============================
   *  👥 Nhân sự
   * =============================== */
  employees: Employee[] = [
    {
      id: 1,
      name: 'Vũ Hải',
      avatar: 'https://i.pravatar.cc/40?img=1',
      owner: 'Bạn',
      role: 'Account Executive',
      department: 'Sales',
      email: 'hai.vu@company.com',
    },
    {
      id: 2,
      name: 'Ngô Lan',
      avatar: 'https://i.pravatar.cc/40?img=2',
      owner: 'Minh',
      role: 'Customer Success',
      department: 'CS',
      email: 'lan.ngo@company.com',
    },
    {
      id: 3,
      name: 'Phan Dũng',
      avatar: 'https://i.pravatar.cc/40?img=3',
      owner: 'Huyền',
      role: 'Sales Manager',
      department: 'Sales',
      email: 'dung.phan@company.com',
    },
  ];

  /** ===============================
   *  📊 Thống kê
   * =============================== */
  stats = [
    { label: 'Tổng khách hàng', value: 1248 },
    { label: 'Khách hàng mới (30 ngày)', value: 132 },
    { label: 'Liên hệ cần theo dõi', value: 47 },
    { label: 'Công ty', value: 318 },
  ];

  /** ===============================
   *  🧍 Modal Nhân sự
   * =============================== */
  showEmployeeModal = false;
  editingEmployee: Employee | null = null;
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    /** Form tạo hồ sơ khách hàng */
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      role: [''],
      source: [''],
      note: [''],
      oppName: [''],
      stage: [''],
      amount: [''],
      deadline: [''],
    });

    /** Form nhân sự */
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      owner: [''],
    });
  }

  /* ===========================================================
     📌 HỒ SƠ KHÁCH HÀNG
     =========================================================== */

  openModal() {
    this.showModal = true;
    this.selectedEmployees = [];
  }

  closeModal() {
    this.showModal = false;
  }

  /** Checkbox chọn nhân sự khi tạo hồ sơ */
  onCheckboxChange(emp: Employee, event: Event) {
    const input = event.target as HTMLInputElement | null;
    const checked = !!input?.checked;
    this.toggleEmployeeSelection(emp, checked);
  }

  toggleEmployeeSelection(emp: Employee, checked: boolean) {
    if (checked) {
      if (!this.selectedEmployees.find((e) => e.id === emp.id)) {
        this.selectedEmployees.push(emp);
      }
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(
        (e) => e.id !== emp.id
      );
    }
  }
  /** ------------------------------
   *  📋 Hồ sơ khách hàng - Xem / Sửa / Xóa
   * ------------------------------ */
  editingProfileIndex?: number;

  /** Xem chi tiết hồ sơ khách hàng */
  onViewProfile(profile: any) {
    const empNames =
      profile.employees && profile.employees.length > 0
        ? profile.employees.map((e: any) => e.name).join(', ')
        : 'Không có';
    alert(
      `👁 Thông tin hồ sơ:\n\nHọ tên: ${profile.fullName}\nEmail: ${profile.email}\nCông ty: ${profile.company}\nNhân sự liên quan: ${empNames}`
    );
  }

  /** Sửa hồ sơ */
  onEditProfile(profile: any, index: number) {
    this.editingProfileIndex = index;
    this.showModal = true;
    this.profileForm.patchValue(profile);
    this.selectedEmployees = [...(profile.employees || [])];
  }

  /** Xóa hồ sơ */
  deleteProfile(index: number) {
    const confirmDelete = confirm(
      `🗑 Bạn có chắc muốn xóa hồ sơ: ${this.profiles[index].fullName}?`
    );
    if (confirmDelete) {
      this.profiles.splice(index, 1);

      // ✅ Cập nhật tổng khách hàng
      const total = this.stats.find((s) => s.label === 'Tổng khách hàng');
      if (total) total.value = this.profiles.length + 1248;

      alert('✅ Hồ sơ đã được xóa.');
    }
  }

  /** Lưu hồ sơ */
  saveProfile() {
    if (this.profileForm.valid) {
      const newProfile = {
        ...this.profileForm.value,
        employees: [...this.selectedEmployees],
      };

      this.profiles.push(newProfile);

      // ✅ Cập nhật tổng khách hàng
      const total = this.stats.find((s) => s.label === 'Tổng khách hàng');
      if (total) total.value = this.profiles.length + 1248; // tăng dựa theo dữ liệu ban đầu

      alert(
        `✅ Đã tạo hồ sơ: ${newProfile.fullName} (${this.selectedEmployees.length} nhân sự liên quan)`
      );

      this.closeModal();
      this.profileForm.reset();
    } else {
      alert('⚠️ Vui lòng nhập đầy đủ thông tin bắt buộc!');
    }
  }

  /* ===========================================================
     👥 NHÂN SỰ - QUẢN LÝ
     =========================================================== */

  openEmployeeModal(emp?: Employee) {
    this.showEmployeeModal = true;
    if (emp) {
      this.editingEmployee = { ...emp };
      this.employeeForm.patchValue(emp);
    } else {
      this.editingEmployee = null;
      this.employeeForm.reset();
    }
  }

  closeEmployeeModal() {
    this.showEmployeeModal = false;
  }

  saveEmployee() {
    if (this.employeeForm.invalid) {
      alert('⚠️ Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const formValue = this.employeeForm.value;

    if (this.editingEmployee) {
      const index = this.employees.findIndex(
        (e) => e.id === this.editingEmployee!.id
      );
      if (index > -1)
        this.employees[index] = { ...this.editingEmployee, ...formValue };
    } else {
      const newEmp: Employee = {
        id: Date.now(),
        ...formValue,
        avatar: `https://i.pravatar.cc/40?u=${formValue.email}`,
      };
      this.employees.push(newEmp);
    }

    this.closeEmployeeModal();
  }

  deleteEmployee(emp: Employee) {
    if (confirm(`Bạn có chắc muốn xóa nhân sự ${emp.name}?`)) {
      this.employees = this.employees.filter((e) => e.id !== emp.id);
    }
  }

  openGroupManager() {
    alert('👥 Chức năng Quản lý nhóm sẽ sớm cập nhật.');
  }

  /* ===========================================================
     🔍 Tiện ích xem / sửa
     =========================================================== */
  onView(emp: Employee) {
    alert(`👁 Xem thông tin ${emp.name}\nChức danh: ${emp.role}`);
  }

  onEdit(emp: Employee) {
    this.openEmployeeModal(emp);
  }
}
