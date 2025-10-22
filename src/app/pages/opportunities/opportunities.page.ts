import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunitiesComponent } from './opportunities.component';

@Component({
  selector: 'app-opportunities-page',
  standalone: true,
  imports: [CommonModule, OpportunitiesComponent],
  template: `<app-opportunities></app-opportunities>`,
})
export class OpportunitiesPage {}
