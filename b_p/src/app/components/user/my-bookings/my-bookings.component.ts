import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>📋 My Bookings</h1>
      <div class="loading" *ngIf="loading">Loading...</div>
      <div class="empty" *ngIf="!loading && bookings.length === 0">No bookings yet. <a href="/services">Book a service</a></div>
      <div class="bookings-list" *ngIf="!loading && bookings.length > 0">
        <div class="booking-card" *ngFor="let b of bookings">
          <div class="booking-top">
            <h3>{{ b.service?.name }}</h3>
            <span class="badge" [class]="b.status">{{ b.status }}</span>
          </div>
          <div class="booking-info">
            <span>📅 {{ b.date | date:'mediumDate' }}</span>
            <span>🕐 {{ b.time }}</span>
            <span>💰 ₹{{ b.service?.price }}</span>
          </div>
          <p class="notes" *ngIf="b.notes">📝 {{ b.notes }}</p>
          <button *ngIf="b.status === 'pending'" (click)="cancel(b._id)" class="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { padding:40px; background:#fdf6f0; min-height:100%; }
    h1 { color:#333; font-size:2rem; margin-bottom:30px; }
    .loading,.empty { text-align:center; padding:60px; color:#888; }
    .empty a { color:#d63384; }
    .bookings-list { display:grid; gap:20px; }
    .booking-card { background:#fff; border-radius:15px; padding:25px; box-shadow:0 4px 15px rgba(0,0,0,0.08); }
    .booking-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; }
    h3 { color:#333; font-size:1.2rem; }
    .badge { padding:5px 14px; border-radius:20px; font-size:0.8rem; font-weight:600; text-transform:capitalize; }
    .badge.pending { background:#fff3cd; color:#856404; }
    .badge.confirmed { background:#d4edda; color:#155724; }
    .badge.completed { background:#d1ecf1; color:#0c5460; }
    .badge.cancelled { background:#f8d7da; color:#721c24; }
    .booking-info { display:flex; gap:20px; flex-wrap:wrap; color:#666; font-size:0.95rem; margin-bottom:10px; }
    .notes { color:#888; font-size:0.9rem; margin-top:10px; }
    .btn-cancel { margin-top:15px; padding:8px 20px; background:#dc3545; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:600; }
    .btn-cancel:hover { background:#c82333; }
  `]
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getMyBookings().subscribe({
      next: (data) => { this.bookings = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  cancel(id: string) {
    if (confirm('Cancel this booking?')) {
      this.api.cancelBooking(id).subscribe(() => {
        const b = this.bookings.find(b => b._id === id);
        if (b) b.status = 'cancelled';
      });
    }
  }
}