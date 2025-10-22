import { Component } from '@angular/core';
import { SegmentComponent } from './segment.component';

@Component({
  selector: 'app-segment-page',
  standalone: true,
  imports: [SegmentComponent],
  template: `<app-segment></app-segment>`,
})
export class SegmentPage {}
