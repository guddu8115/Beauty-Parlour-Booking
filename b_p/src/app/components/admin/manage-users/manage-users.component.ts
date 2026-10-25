import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>👥 Manage Users</h1>
      <div class="loading" *ngIf="loading">Loading...</div>
      <table *ngIf="!loading && users.length > 0">
        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th></tr></thead>
        <tbody>
          <tr *ngFor="let u of users; let i = index">
            <td>{{ i + 1 }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.phone || 'N/A' }}</td>
            <td>{{ u.createdAt | date:'mediumDate' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="empty" *ngIf="!loading && users.length === 0">No users registered yet.</div>
    </div>
  `,
  styles: [`
    .page { padding:40px; background:#f4f6f9; min-height:100%; }
    h1 { color:#333; font-size:2rem; margin-bottom:30px; }
    .loading,.empty { text-align:center; padding:60px; color:#888; }
    table { width:100%; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.08); border-collapse:collapse; }
    th { background:#1a1a2e; color:#fff; padding:14px 16px; text-align:left; font-size:0.85rem; }
    td { padding:14px 16px; border-bottom:1px solid #f0f0f0; font-size:0.9rem; }
  `]
})
export class ManageUsersComponent implements OnInit {
  users: any[] = []; loading = true;
  constructor(private api: ApiService) {}
  ngOnInit() { this.api.getAllUsers().subscribe(d => { this.users = d; this.loading = false; }); }
}