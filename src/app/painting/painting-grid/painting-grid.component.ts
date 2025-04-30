import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { binarySearch, ColorRow, insertSorted, SelectionRow } from '../../../util';

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

    const condensedId = cn + rn;
    const element = document.getElementById(id);
    if (!element) return;

    // Check if the selected color is already applied to a different color
    const oldColor = this.colorRows.find(row => binarySearch(row.selections, condensedId) !== -1);

    // If the old color is different from the new selected color, remove the selection from the old color
    if (oldColor && oldColor.row.color.hex !== selectedRow.row.color.hex) {
      const index = binarySearch(oldColor.selections, condensedId);
      if (index !== -1) oldColor.selections.splice(index, 1);
    }

    // Add the selection to the new selected color if it doesn't already exist
    if (binarySearch(selectedRow.selections, condensedId) === -1) insertSorted(selectedRow.selections, condensedId);

    // Change the background color of the selected cell
    element.style.backgroundColor = selectedRow.row.color.hex;
  }
}
