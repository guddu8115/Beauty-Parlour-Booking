import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RegisterComponent {

  form = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  loading       = false;
  error         = '';
  success       = '';
  submitted     = false;
  showPassword  = false;
  showConfirm   = false;

  constructor(private auth: AuthService, private router: Router) {}

  get passwordStrength(): string {
    const p = this.form.password;
    if (!p) return '';
    if (p.length < 6)  return 'weak';
    if (p.length < 10) return 'medium';
    return 'strong';
  }

  get strengthLabel(): string {
    const s = this.passwordStrength;
    if (s === 'weak')   return '🔴 Weak';
    if (s === 'medium') return '🟡 Medium';
    if (s === 'strong') return '🟢 Strong';
    return '';
  }

  togglePassword()  { this.showPassword = !this.showPassword; }
  toggleConfirm()   { this.showConfirm  = !this.showConfirm; }

  register() {
    this.submitted = true;
    this.error     = '';

    if (!this.form.name.trim()) {
      this.error = 'Full name is required'; return;
    }
    if (!this.form.email.trim()) {
      this.error = 'Email is required'; return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.form.email)) {
      this.error = 'Please enter a valid email address'; return;
    }
    if (!this.form.password) {
      this.error = 'Password is required'; return;
    }
    if (this.form.password.length < 6) {
      this.error = 'Password must be at least 6 characters'; return;
    }
    if (this.form.password !== this.form.confirmPassword) {
      this.error = 'Passwords do not match'; return;
    }

    this.loading = true;
    this.success = '';

    const payload = {
      name:     this.form.name.trim(),
      email:    this.form.email.trim().toLowerCase(),
      phone:    this.form.phone.trim(),
      password: this.form.password
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = '✅ Account created successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: (err) => {
        this.loading = false;
        this.error   = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}