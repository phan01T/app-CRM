import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employee.component';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [CommonModule, EmployeesComponent],
  template: `
    <div class="employee-page">
      <app-employees></app-employees>
    </div>
  `,
  styleUrls: ['./employee.component.scss'], // có thể tách riêng nếu muốn
})
export class EmployeesPage {}
