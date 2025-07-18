import { Component, OnInit,NgModule } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import {ICart} from'../core/models/models'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderUserComponent } from "../shared/header-user/header-user.component";
import { FooterUserComponent } from "../shared/footer-user/footer-user.component";
@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, HeaderUserComponent, FooterUserComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
 cart: ICart | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: res => {
        this.cart = res.cart;
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Failed to load cart.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  remove(productId: string) {
    this.cartService.deleteFromCart(productId).subscribe({
      next: res => {
        this.cart = res.cart;
      },
      error: err => {
        console.error('Failed to remove item:', err);
      }
    });
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.remove(productId);
    } else {
      this.cartService.updateCart(productId, quantity).subscribe({
        next: res => {
          this.cart = res.cart;
        },
        error: err => {
          console.error('Failed to update quantity:', err);
        }
      });
    }
  }

  get totalPrice(): number {
    if (!this.cart) return 0;
    return this.cart.products.reduce((sum, p) => {
      return sum + (p.quantity * (p.product.price || 0));
    }, 0);
  }
}
