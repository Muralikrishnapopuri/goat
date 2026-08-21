import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  badge: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div style="background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <div>
        <span style="font-size: 0.8rem; padding: 0.2rem 0.5rem; background: rgba(59, 130, 246, 0.2); color: #60a5fa; border-radius: 4px;">{{ product.badge }}</span>
        <h3 style="margin-top: 0.4rem; color: #f8fafc;">{{ product.name }}</h3>
        <p style="color: #34d399; font-weight: 600; font-size: 1.1rem; margin-top: 0.2rem;">${{ product.price }}</p>
      </div>

      <button class="btn" (click)="onAddToCart()">
        🛒 Add to Cart (@Output Emit)
      </button>
    </div>
  `
})
export class ProductCardComponent {
  // @Input() receives prop data from Parent (React: props.product)
  @Input() product!: Product;

  // @Output() emits custom event to Parent (React: props.onAddToCart(product))
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
