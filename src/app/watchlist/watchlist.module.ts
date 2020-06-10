import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { WatchlistComponent } from './watchlist.component';
import { WatchlistItemComponent } from './watchlist-item/watchlist-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ WatchlistComponent, WatchlistItemComponent ],
  exports: [
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FlexLayoutModule
  ]
})
export class WatchlistModule {
}
