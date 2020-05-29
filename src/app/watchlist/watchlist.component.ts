import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { WatchlistService } from './watchlist.service';
import { Watchlist } from './watchlist.model';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  @Input() addItem$: Subject<string>;

  watchlist$: Observable<Watchlist>;

  constructor(private service: WatchlistService) {
  }

  ngOnInit(): void {
    this.watchlist$ = this.service.getWatchlist();
    this.addItem$.subscribe(value => {
      this.service.addItem(value).subscribe(_ => this.watchlist$ = this.service.getWatchlist());
    });
  }

  onRemoved(mediaId: string) {
    this.service.removeItem(mediaId).subscribe(() => {
      this.watchlist$ = this.service.getWatchlist();
    });
  }
}
