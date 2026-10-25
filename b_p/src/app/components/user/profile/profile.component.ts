import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="profile-card">
        <div class="avatar">👤</div>
        <h2>My Profile</h2>
        <div class="alert success" *ngIf="success">{{ success }}</div>
        <div class="alert error" *ngIf="error">{{ error }}</div>
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" [(ngModel)]="form.name" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="form.email" disabled />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="text" [(ngModel)]="form.phone" />
        </div>
        <button (click)="update()" [disabled]="loading" class="btn-update">
          {{ loading ? 'Updating...' : 'Update Profile' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height:calc(100vh - 70px); background:#fdf6f0; display:flex; align-items:center; justify-content:center; padding:30px; }
    .profile-card { background:#fff; border-radius:20px; padding:50px 40px; width:100%; max-width:450px; box-shadow:0 10px 40px rgba(0,0,0,0.1); text-align:center; }
    .avatar { font-size:5rem; margin-bottom:10px; }
    h2 { color:#333; font-size:1.8rem; margin-bottom:30px; }
    .alert { padding:12px; border-radius:8px; margin-bottom:20px; font-size:0.9rem; }
    .alert.success { background:#e0ffe0; color:#007700; }
    .alert.error { background:#ffe0e0; color:#cc0000; }
    .form-group { text-align:left; margin-bottom:20px; }
    label { display:block; margin-bottom:6px; color:#555; font-weight:600; font-size:0.9rem; }
    input { width:100%; padding:12px 16px; border:2px solid #eee; border-radius:10px; font-size:1rem; box-sizing:border-box; }
    input:focus { outline:none; border-color:#d63384; }
    input:disabled { background:#f5f5f5; color:#999; }
    .btn-update { width:100%; padding:14px; background:linear-gradient(135deg,#d63384,#7b2d8b); color:#fff; border:none; border-radius:10px; font-weight:700; font-size:1rem; cursor:pointer; }
    .btn-update:disabled { opacity:0.7; cursor:not-allowed; }
  `]
})
export class ProfileComponent implements OnInit {
  form = { name: '', email: '', phone: '' };
  loading = false; success = ''; error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProfile().subscribe({ next: (user) => { this.form = { name: user.name, email: user.email, phone: user.phone || '' }; } });
  }

  update() {
    this.loading = true;
    this.api.updateProfile({ name: this.form.name, phone: this.form.phone }).subscribe({
      next: () => { this.loading = false; this.success = 'Profile updated successfully!'; },
      error: () => { this.loading = false; this.error = 'Update failed'; }
    });
  }
}