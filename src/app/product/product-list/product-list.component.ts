import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/models';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
   products: IProduct[] = [];
  isLoading = true;
  error = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
        console.log(this.products);
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId, 1).subscribe({
      next: (res) => {
        alert('✅ Product added to cart');
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('❌ Failed to add product to cart');
      }
    });
  }
}
  
