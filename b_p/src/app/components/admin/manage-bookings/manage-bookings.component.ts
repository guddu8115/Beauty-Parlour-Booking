import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>📅 Manage Bookings</h1>
      <div class="loading" *ngIf="loading">Loading...</div>
      <table *ngIf="!loading && bookings.length > 0">
        <thead><tr><th>Customer</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Update</th></tr></thead>
        <tbody>
          <tr *ngFor="let b of bookings">
            <td>{{ b.user?.name }}<br><small>{{ b.user?.email }}</small></td>
            <td>{{ b.service?.name }}<br><small>₹{{ b.service?.price }}</small></td>
            <td>{{ b.date | date:'mediumDate' }}</td>
            <td>{{ b.time }}</td>
            <td><span class="badge" [class]="b.status">{{ b.status }}</span></td>
            <td>
              <select [(ngModel)]="b.status" (change)="updateStatus(b)">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="empty" *ngIf="!loading && bookings.length === 0">No bookings yet.</div>
    </div>
  `,
  styles: [`
    .page { padding:40px; background:#f4f6f9; min-height:100%; }
    h1 { color:#333; font-size:2rem; margin-bottom:30px; }
    .loading,.empty { text-align:center; padding:60px; color:#888; }
    table { width:100%; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.08); border-collapse:collapse; }
    th { background:#1a1a2e; color:#fff; padding:14px 16px; text-align:left; font-size:0.85rem; }
    td { padding:14px 16px; border-bottom:1px solid #f0f0f0; font-size:0.9rem; vertical-align:middle; }
    td small { color:#888; }
    .badge { padding:5px 14px; border-radius:20px; font-size:0.8rem; font-weight:600; text-transform:capitalize; }
    .badge.pending { background:#fff3cd; color:#856404; }
    .badge.confirmed { background:#d4edda; color:#155724; }
    .badge.completed { background:#d1ecf1; color:#0c5460; }
    .badge.cancelled { background:#f8d7da; color:#721c24; }
    select { padding:8px 12px; border:2px solid #eee; border-radius:8px; font-size:0.9rem; cursor:pointer; }
    select:focus { outline:none; border-color:#d63384; }
  `]
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = []; loading = true;
  constructor(private api: ApiService) {}
  ngOnInit() { this.api.getAllBookings().subscribe(d => { this.bookings = d; this.loading = false; }); }
  updateStatus(b: any) { this.api.updateBooking(b._id, { status: b.status }).subscribe(); }
}