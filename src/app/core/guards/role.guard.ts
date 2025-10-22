import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    console.warn('⛔ RoleGuard: đang chạy SSR, bỏ qua kiểm tra localStorage');
    return false;
  }

  const role = localStorage.getItem('user_role');
  const token = localStorage.getItem('access_token');
  const user = localStorage.getItem('user');

  if (!token && !user) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = (route.data['roles'] as string[]) || [];
  if (allowedRoles.length > 0 && !allowedRoles.includes(role || '')) {
    console.warn(`⛔ Không có quyền truy cập (${role})`);
    router.navigate(['/403']);
    return false;
  }

  return true;
};
