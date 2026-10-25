import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {

  email        = '';
  password     = '';
  loading      = false;
  error        = '';
  showPassword = false;
  submitted    = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() { this.showPassword = !this.showPassword; }

  login() {
    this.submitted = true;
    this.error     = '';

    if (!this.email.trim()) {
      this.error = 'Email is required'; return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid email'; return;
    }
    if (!this.password) {
      this.error = 'Password is required'; return;
    }

    this.loading = true;

    this.auth.login({
      email:    this.email.trim().toLowerCase(),
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.router.navigate([
          res.user.role === 'admin' ? '/admin/dashboard' : '/home'
        ]);
      },
      error: (err) => {
        this.loading = false;
        this.error   = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}