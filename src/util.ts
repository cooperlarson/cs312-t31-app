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

export function loadColors(http: HttpClient): Observable<Color[]> {
  return http.get<Color[]>(COLORS_API_ENDPOINT);
}
