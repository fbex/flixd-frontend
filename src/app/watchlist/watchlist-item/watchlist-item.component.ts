import { Component, EventEmitter, Input, Output } from '@angular/core';

import { WatchlistItem } from '../watchlist.model';

@Component({
  selector: 'app-watchlist-item',
  templateUrl: './watchlist-item.component.html',
  styleUrls: ['./watchlist-item.component.scss']
})
export class WatchlistItemComponent {

  @Input() item: WatchlistItem;
  @Output() removed = new EventEmitter<string>();

  get releaseYear(): number {
    return new Date(this.item.releaseDate).getFullYear();
  }

  get posterUrl(): string {
    return 'https://image.tmdb.org/t/p/w154' + this.item.posterPath;
  }

  remove() {
    this.removed.emit(this.item.mediaId);
  }
}
