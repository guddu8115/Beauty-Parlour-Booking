import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicesComponent } from './components/user/services/services.component';
import { BookingComponent } from './components/user/booking/booking.component';
import { MyBookingsComponent } from './components/user/my-bookings/my-bookings.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ManageServicesComponent } from './components/admin/manage-services/manage-services.component';
import { ManageBookingsComponent } from './components/admin/manage-bookings/manage-bookings.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '',         redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',     component: HomeComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about',    component: AboutComponent },
  { path: 'gallery',  component: GalleryComponent },
  { path: 'booking/:id',  component: BookingComponent,   canActivate: [authGuard] },
  { path: 'my-bookings',  component: MyBookingsComponent, canActivate: [authGuard] },
  { path: 'profile',      component: ProfileComponent,    canActivate: [authGuard] },
  { path: 'admin/dashboard', component: DashboardComponent,       canActivate: [authGuard, adminGuard] },
  { path: 'admin/services',  component: ManageServicesComponent,  canActivate: [authGuard, adminGuard] },
  { path: 'admin/bookings',  component: ManageBookingsComponent,  canActivate: [authGuard, adminGuard] },
  { path: 'admin/users',     component: ManageUsersComponent,     canActivate: [authGuard, adminGuard] },
  { path: 'admin/add-admin', component: AddAdminComponent,        canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: 'home' }
];