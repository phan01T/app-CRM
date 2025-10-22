import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ⚠️ Chạy trên server → không có localStorage
  if (!isPlatformBrowser(platformId)) {
    console.warn('⛔ AuthGuard: đang chạy SSR, bỏ qua kiểm tra localStorage');
    return false;
  }

  const token = localStorage.getItem('access_token');
  const user = localStorage.getItem('user');

  if (!token && !user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
