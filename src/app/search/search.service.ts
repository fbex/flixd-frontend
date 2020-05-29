import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SearchResults } from './search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  search(query: string): Observable<SearchResults> {
    const body: SearchQuery = {query};
    return this.http.post<SearchResults>('/api/media/search', body);
  }
}

export interface SearchQuery {
  query: string;
}
