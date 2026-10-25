import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterLink]
})
export class DashboardComponent implements OnInit {

  users: any[]    = [];
  services: any[] = [];
  bookings: any[] = [];
  loading = true;
  error   = '';
  private loadedCount = 0;

  get totalUsers()     { return this.users.length; }
  get totalServices()  { return this.services.length; }
  get activeServices() { return this.services.filter(s => s.isActive).length; }
  get totalBookings()  { return this.bookings.length; }
  get pendingCount()   { return this.bookings.filter(b => b.status === 'pending').length; }
  get confirmedCount() { return this.bookings.filter(b => b.status === 'confirmed').length; }
  get completedCount() { return this.bookings.filter(b => b.status === 'completed').length; }
  get cancelledCount() { return this.bookings.filter(b => b.status === 'cancelled').length; }

  get totalRevenue() {
    return this.bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (b.service?.price || 0), 0);
  }

  getPercent(count: number): number {
    if (this.bookings.length === 0) return 0;
    return Math.round((count / this.bookings.length) * 100);
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadAll(); }

  loadAll() {
    this.loading = true;
    this.error   = '';
    this.loadedCount = 0;

    this.api.getAllUsers().subscribe({
      next: (d) => { this.users = d; this.checkDone(); },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load data. Check backend.';
        this.loading = false;
      }
    });

    this.api.getAllServices().subscribe({
      next: (d) => { this.services = d; this.checkDone(); },
      error: ()  => this.checkDone()
    });

    this.api.getAllBookings().subscribe({
      next: (d) => { this.bookings = d; this.checkDone(); },
      error: ()  => this.checkDone()
    });
  }

  private checkDone() {
    this.loadedCount++;
    if (this.loadedCount >= 3) {
      this.loading = false;
      this.loadedCount = 0;
    }
  }
}