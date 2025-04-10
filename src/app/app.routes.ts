import { Routes } from '@angular/router';
import { BiographyPageComponent } from './biography/biography-page/biography-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: BiographyPageComponent }
];
