import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="products-page">
      <app-products></app-products>
    </div>
  `,
})
export class ProductsPage {}
