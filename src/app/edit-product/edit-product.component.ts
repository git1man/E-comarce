import { Component } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IProduct } from '../core/models/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  form!: FormGroup;
  productId = '';
  loading = false;
  error = '';
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      desc: [''],
      imgURL: [''],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onLoadProduct() {
    if (!this.productId) {
      this.error = 'Please enter a product ID';
      return;
    }

    this.loading = true;
    this.error = '';
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.form.patchValue(res.data);
        this.showForm = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Could not find product';
        this.loading = false;
        this.showForm = false;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.productService.editProduct(this.productId, this.form.value).subscribe({
      next: () => this.router.navigate(['/admin/products']),
      error: (err) => this.error = err.message
    });
  }
}
