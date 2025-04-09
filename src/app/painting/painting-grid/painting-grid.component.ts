import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-painting-grid',
  imports: [
    NgForOf
  ],
  templateUrl: './painting-grid.component.html',
  styleUrl: './painting-grid.component.scss'
})
export class PaintingGridComponent {
  rows = Array.from({ length: 100 }, (_, i) => i + 1);
  getColumnNames() {
    let cols = [];
    for (let i = -1;i<26;i++) {
      let letterI = (i==-1) ? '' : (i + 10).toString(36).toUpperCase();
      for (let j = 0;j<26;j++) {
        let letterJ = (j + 10).toString(36).toUpperCase();
        cols.push(letterI+letterJ);
      }
    }
    return cols;
  }
}
