import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/guards/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  lang: 'vi' | 'en' = 'vi';

  constructor(private router: Router, private authService: AuthService) {}

  setLang(lang: 'vi' | 'en') {
    this.lang = lang;
  }

  onLogin() {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      alert('Chưa có tài khoản. Vui lòng đăng ký.');
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email === this.email && user.password === this.password) {
      const fakeToken = 'fake-jwt-token';
      this.authService.login(fakeToken, user);

      localStorage.setItem('user_role', user.role);
      localStorage.setItem('access_token', fakeToken);

      alert(`Đăng nhập thành công (${user.role})!`);

      // ✅ Điều hướng theo role
      if (user.role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/dashboard']);
      }
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }
  }
}
