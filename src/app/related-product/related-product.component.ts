import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { IProduct } from '../core/models/models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  imports: [CommonModule]
})
export class RelatedProductComponent implements OnInit {
  @Input() productId!: string;
  related: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.productId) {
      this.productService.getRlatedProdcuts(this.productId).subscribe({
        next: (res) => this.related = res.data,
        error: () => console.error('Failed to load related products')
      });
    }
  }
}
