import { Component } from '@angular/core';
import{FormBuilder,FormGroup,Validators,ReactiveFormsModule}from '@angular/forms'
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
  if (this.loginForm.invalid) return;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      const role = this.authService.getRole();

      console.log('Login successful. Role:', role);

      if (role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/product']);
      }
    },
    error: (err) => {
      console.error('Login error:', err);
      this.errorMessage = err.error?.message || 'Login failed. Please try again.';
    }
  });
}
}