import { Routes } from '@angular/router';
import { BiographyPageComponent } from './biography/biography-page/biography-page.component';
import { PaintingGridComponent } from './painting/painting-grid/painting-grid.component';

export const routes: Routes = [
  { path: 'about-us', component: BiographyPageComponent },
  { path: 'painting-grid', component: PaintingGridComponent }
];
