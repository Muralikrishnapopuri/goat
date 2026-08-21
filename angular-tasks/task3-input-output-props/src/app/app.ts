import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent, Product } from './product-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Task 3: @Input() & @Output() EventEmitters';
  
  productsList: Product[] = [
    { id: 101, name: 'Angular 18 Masterclass', price: 49.99, badge: 'BESTSELLER' },
    { id: 102, name: 'RxJS Reactive Streams Guide', price: 29.99, badge: 'FEATURED' },
    { id: 103, name: 'TypeScript Pro Architecture', price: 39.99, badge: 'NEW' }
  ];

  cart: Product[] = [];

  handleAddToCart(product: Product): void {
    this.cart.push(product);
  }

  clearCart(): void {
    this.cart = [];
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }
}
