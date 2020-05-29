import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Watchlist, WatchlistItem } from './watchlist.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http: HttpClient) { }

  getWatchlist(): Observable<Watchlist> {
    return this.http.get<Watchlist>('/api/watchlist');
  }

  addItem(mediaId: string): Observable<WatchlistItem> {
    return this.http.post<WatchlistItem>(`/api/watchlist/item/${mediaId}`, undefined);
  }

  removeItem(mediaId: string): Observable<WatchlistItem> {
    return this.http.delete<WatchlistItem>(`/api/watchlist/item/${mediaId}`);
  }
}
