import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  header_title = 'HueGrid';
  header_subtitle = 'Your Color Palette Companion';
  logo = {
    src: 'images/HueGrid_logo.png',
    alt: 'HueGrid Logo',
  }
}
