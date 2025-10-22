import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout.component';

// ==== DASHBOARD PAGES ====
import { CustomerProfileComponent } from './pages/dashboard/customerprofile/customerprofile.component';
import { SegmentComponent } from './pages/dashboard/segment/segment.component';
import { ActivitiesPage } from './pages/dashboard/activities/activities.page';
import { SyncPage } from './pages/dashboard/sync/sync.page';

// ==== OTHER PAGES ====
import { EmployeesPage } from './pages/employee/employee.page';
import { InvitationPage } from './pages/invitation/invitation.page';
import { RegistrationPage } from './pages/registration/registration.page';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { PermissionsPage } from './pages/dashboard/permissions/permissions.page';
import { SupportPage } from './pages/support/support.page';
import { EmailPage } from './pages/email/email.page';
import { EmailComponent } from './pages/email/email.component';
import { SettingsPage } from './settings/settings.page';
import { InvoicesPage } from './pages/invoices/invoices.page';
import { CalendarPage } from './pages/calendar/calendar.page';

export const routes: Routes = [
  // ✅ Layout chính (các trang đã đăng nhập)
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      // --- Dashboard ---
      {
        path: 'dashboard',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },

      // --- Modules ---
      {
        path: 'leads',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/leads/leads.page').then((m) => m.LeadsPage),
      },
      {
        path: 'contacts',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/contacts/contacts.page').then((m) => m.ContactsPage),
      },
      {
        path: 'employee',
        canActivate: [RoleGuard],
        component: EmployeesPage,
      },
      {
        path: 'opportunities',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/opportunities/opportunities.page').then(
            (m) => m.OpportunitiesPage
          ),
      },
      {
        path: 'products',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/products/products.page').then((m) => m.ProductsPage),
      },
      {
        path: 'invoices',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/invoices/invoices.page').then((m) => m.InvoicesPage),
      },

      // --- Calendar ---
      {
        path: 'calendar',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/calendar/calendar.page').then((m) => m.CalendarPage),
      },
      {
        path: 'calendar/tasks',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/calendar-tasks/calendar-tasks.page').then(
            (m) => m.CalendarTasksPage
          ),
      },
      {
        path: 'calendar/activities',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/calendar-activities/calendar-activities.page').then(
            (m) => m.CalendarActivitiesPage
          ),
      },
      {
        path: 'calendar/messages',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/calendar-messages/calendar-messages.page').then(
            (m) => m.CalendarMessagesPage
          ),
      },

      // --- Other ---
      {
        path: 'support',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/support/support.page').then((m) => m.SupportPage),
      },
      {
        path: 'email',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/email/email.page').then((m) => m.EmailPage),
      },
      {
        path: 'settings',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./settings/settings.page').then((m) => m.SettingsPage),
      },

      {
        path: 'system',
        canActivate: [RoleGuard],
        loadComponent: () =>
          import('./pages/system/system.page').then((m) => m.SystemPage),
      },

      // --- Dashboard Sub-pages ---
      {
        path: 'customer',
        canActivate: [RoleGuard],
        component: CustomerProfileComponent,
      },
      {
        path: 'segment',
        canActivate: [RoleGuard],
        component: SegmentComponent,
      },
      {
        path: 'activities',
        canActivate: [RoleGuard],
        component: ActivitiesPage,
      },
      {
        path: 'sync',
        loadComponent: () =>
          import('./pages/dashboard/sync/sync.page').then((m) => m.SyncPage),
        canActivate: [RoleGuard],
      },

      // --- Others ---
      { path: 'employees', canActivate: [RoleGuard], component: EmployeesPage },
      {
        path: 'invitation',
        canActivate: [RoleGuard],
        component: InvitationPage,
      },
    ],
  },

  // ✅ Các trang ngoài layout (public)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration/registration.page').then(
        (m) => m.RegistrationPage
      ),
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },

  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['User', 'Sales', 'Manager'] },
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'permissions', // Trang mặc định
  },
  {
    path: 'permissions',
    component: PermissionsPage,
    title: 'Quyền & Tuân thủ CRM',
  },

  {
    path: '403',
    loadComponent: () =>
      import('./pages/error403/error403.page').then((m) => m.Error403Page),
  },

  // ✅ Fallback: nếu URL sai, chuyển về dashboard
  { path: '**', redirectTo: 'dashboard' },
];
