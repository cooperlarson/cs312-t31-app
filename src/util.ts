import { HttpClient } from '@angular/common/http';
import { COLORS_API_ENDPOINT } from './globals';
import { Observable } from 'rxjs';

export interface Color {
  id: number;
  name: string;
  hex: string;
  editing?: boolean;
}

export interface ColorRow {
  selected: boolean;
  color: Color;
}

export interface SelectionRow {
  row: ColorRow,
  selections: string[]
}

export function loadColors(http: HttpClient): Observable<Color[]> {
  return http.get<Color[]>(COLORS_API_ENDPOINT);
}

export function insertSorted(arr: string[], value: string) {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < value) low = mid + 1;
    else high = mid;
  }

  arr.splice(low, 0, value); // inserts at correct sorted position
}
