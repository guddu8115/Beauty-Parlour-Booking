import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  adminData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  successMsg = '';
  errorMsg   = '';
  loading    = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  addAdmin() {
    this.errorMsg   = '';
    this.successMsg = '';

    if (!this.adminData.name || !this.adminData.email || !this.adminData.password) {
      this.errorMsg = 'All fields are required!';
      return;
    }
    if (this.adminData.password !== this.adminData.confirmPassword) {
      this.errorMsg = 'Passwords do not match!';
      return;
    }
    if (this.adminData.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters!';
      return;
    }

    this.loading = true;

    this.http.post('http://localhost:5000/api/auth/register', {
      name:     this.adminData.name,
      email:    this.adminData.email,
      password: this.adminData.password,
      role:     'admin'
    }).subscribe({
      next: () => {
        this.successMsg = `Admin "${this.adminData.name}" created successfully!`;
        this.adminData  = { name:'', email:'', password:'', confirmPassword:'' };
        this.loading    = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Failed to create admin!';
        this.loading  = false;
      }
    });
  }
}