import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesComponent } from './activities.component';

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [CommonModule, ActivitiesComponent],
  template: `<app-activities></app-activities>`,
})
export class ActivitiesPage {}
