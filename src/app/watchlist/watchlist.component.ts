import { Component, OnInit } from '@angular/core';

import { WatchlistService } from './watchlist.service';
import { Watchlist } from './watchlist.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  watchlist$: Observable<Watchlist>;

  constructor(private service: WatchlistService) {
  }

  ngOnInit(): void {
    this.watchlist$ = this.service.getWatchlist();
  }

  onRemoved(mediaId: string) {
    this.service.removeItem(mediaId).subscribe(() => {
      this.watchlist$ = this.service.getWatchlist();
    });
  }
}
