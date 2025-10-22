import { Component } from '@angular/core';
import { CustomerProfileComponent } from './customerprofile.component';

@Component({
  selector: 'app-customer-profile-page',
  standalone: true,
  imports: [CustomerProfileComponent],
  template: `<app-customer-profile></app-customer-profile>`,
})
export class CustomerProfilePage {}
