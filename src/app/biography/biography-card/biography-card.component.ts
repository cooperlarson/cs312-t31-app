import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-biography-card',
  imports: [],
  templateUrl: './biography-card.component.html',
  styleUrl: './biography-card.component.scss'
})
export class BiographyCardComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() image!: string;
}
