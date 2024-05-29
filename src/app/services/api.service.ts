import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private apiKey = '9f3fec0e';
  private apiUrl = 'http://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  getMovieDetails(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}&t=${title}`);
  }
}
