import { Routes } from '@angular/router';
import { BiographyPageComponent } from './biography/biography-page/biography-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ColorManagementComponent } from './color-management/color-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'colors', component: ColorManagementComponent },
  { path: 'about-us', component: BiographyPageComponent },
];
