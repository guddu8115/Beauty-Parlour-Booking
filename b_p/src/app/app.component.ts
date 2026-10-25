import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HeaderPublicComponent } from './components/headers/public-header/public-header.component';
import { HeaderUserComponent } from './components/headers/user-header/user-header.component';
import { HeaderAdminComponent } from './components/headers/admin-header/admin-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderPublicComponent,
    HeaderUserComponent,
    HeaderAdminComponent
  ],
  template: `
    <app-header-admin  *ngIf="isAdmin()"></app-header-admin>
    <app-header-user   *ngIf="isUser()"></app-header-user>
    <app-header-public *ngIf="isPublic()"></app-header-public>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  isAdmin()  { return this.auth.isLoggedIn() && this.auth.isAdmin(); }
  isUser()   { return this.auth.isLoggedIn() && !this.auth.isAdmin(); }
  isPublic() { return !this.auth.isLoggedIn(); }
}