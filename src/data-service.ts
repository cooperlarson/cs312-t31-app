import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private apiUrl = 'http://localhost:8443/test/';

    constructor(private http: HttpClient) {}

    async test(): Promise<any> {
        try {
            const data = await firstValueFrom(this.http.get<any>(this.apiUrl));
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
      }
}