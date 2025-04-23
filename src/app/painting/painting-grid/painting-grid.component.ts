import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ColorRow, insertSorted, SelectionRow } from '../../../util';

@Component({
  selector: 'app-painting-grid',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './painting-grid.component.html',
  styleUrl: './painting-grid.component.scss'
})
export class PaintingGridComponent {
  @Input() rowCount: number = 0;
  @Input() colCount: number = 0;
  @Input() colorRows: SelectionRow[] = [];

  getRowNames() {
    return Array.from({ length: this.rowCount }, (_, i) => i + 1);
  }

  getColumnNames() {
    let cols = [];
    for (let i = -1;i<26;i++) {
      let letterI = (i==-1) ? '' : (i + 10).toString(36).toUpperCase();
      for (let j = 0;j<26;j++) {
        if((i+1)*26+j >= this.colCount) {
          break;
        }

        let letterJ = (j + 10).toString(36).toUpperCase();
        cols.push(letterI+letterJ);
      }
    }
    return cols;
  }

  click(cn: string, rn: string) {
    const selectedRow = this.colorRows.find(row => row.row.selected);
    const id = `${cn},${rn}`;

    if (!selectedRow) {
      alert('No color selected. Please select a color before painting.');
      return;
    }

    const element = document.getElementById(id);
    if (element) element.style.backgroundColor = selectedRow.row.color.hex;

    const condensedId = cn + rn;
    if (!selectedRow.selections.includes(condensedId)) insertSorted(selectedRow.selections, condensedId);
  }
}
