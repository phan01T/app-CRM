import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent } from './layout/app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [
    BrowserModule, // 👈 KHÔNG dùng withServerTransition nếu không SSR
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  declarations: [AppLayoutComponent, DashboardComponent],
  bootstrap: [AppLayoutComponent], // 👈 Root = AppLayout
})
export class AppModule {}
