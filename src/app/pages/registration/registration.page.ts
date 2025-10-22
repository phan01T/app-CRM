import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationPage {
  formData = {
    fullName: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: '',
    role: 'User', // mặc định User, có thể chọn Admin trong UI
    shareSetting: 'Riêng tư',
    emailOptIn: false,
    smsOptIn: false,
  };

  constructor(private router: Router) {}

  register() {
    if (
      !this.formData.fullName ||
      !this.formData.company ||
      !this.formData.email ||
      !this.formData.password ||
      !this.formData.confirmPassword
    ) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Mật khẩu nhập lại không khớp!');
      return;
    }

    const user = {
      name: this.formData.fullName,
      company: this.formData.company,
      email: this.formData.email,
      password: this.formData.password,
      role: this.formData.role,
    };

    // ✅ Lưu user và token giả
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_role', user.role);
    localStorage.setItem('access_token', 'fake-token');

    alert(`🎉 Đăng ký thành công (${user.role})! Vui lòng đăng nhập.`);
    this.router.navigate(['/login']);
  }
}
