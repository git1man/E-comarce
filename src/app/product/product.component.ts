import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../core/models/models';
import { ProductService } from '../core/services/product.service';
import { RelatedProductComponent } from '../related-product/related-product.component';
import { HeaderUserComponent } from "../shared/header-user/header-user.component";
import { FooterUserComponent } from '../shared/footer-user/footer-user.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RelatedProductComponent, HeaderUserComponent,FooterUserComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  productId!: string;
  product!: IProduct;
  isLoading = true;
  error = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load product.';
        this.isLoading = false;
      }
    });
  }
}
