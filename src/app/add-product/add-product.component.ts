import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,Validators,FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {ProductService}from'../core/services/product.service'
@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: FormGroup;
  imageFile!: File;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imgURL: ['', Validators.required] // just to trigger required validator
    });
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  submit() {
    if (this.productForm.invalid || !this.imageFile) return;

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('desc', this.productForm.value.desc);
    formData.append('price', this.productForm.value.price);
    formData.append('stock', this.productForm.value.stock);
    formData.append('category', this.productForm.value.category);
    formData.append('imgURL', this.imageFile); // backend expects `imgURL` as filename

    this.productService.addProduct(formData).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Product added successfully';
        this.router.navigate(['/dashbord']); // change route if needed
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to add product';
      }
    });
  }
}
