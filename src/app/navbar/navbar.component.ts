import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../data-service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  brand = 'HueGrid'
  logo = {
    src: 'images/HueGrid_logo.png',
    alt: 'HueGrid Logo',
  }
  
  constructor(private dataService: DataService) {}

  async testClick() {
    const result = await this.dataService.test();
    console.log('Result:', result);
  }
}
