import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchIsFocused = false;
  addItem$ = new Subject<string>();

  onSelectedResult(mediaId: string) {
    this.addItem$.next(mediaId);
  }

  onSearchFocused(focused: boolean) {
    this.searchIsFocused = focused;
  }
}
