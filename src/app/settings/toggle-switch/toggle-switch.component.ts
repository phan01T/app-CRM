import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="toggle"
      [class.active]="isOn()"
      (click)="toggle()"
      role="switch"
      [attr.aria-checked]="isOn()"
    >
      <div class="knob"></div>
    </div>
  `,
  styleUrls: ['./toggle-switch.component.scss'],
})
export class ToggleSwitchComponent {
  @Input() initial = false;
  isOn = signal(this.initial);

  toggle() {
    this.isOn.update((v) => !v);
  }
}
