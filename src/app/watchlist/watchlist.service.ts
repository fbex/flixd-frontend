import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Watchlist } from './watchlist.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getWatchlist(): Observable<Watchlist> {
    return this.http.get<Watchlist>(`${this.baseUrl}/watchlist`);
  }

  removeItem(mediaId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/watchlist/item/${mediaId}`);
  }
}
