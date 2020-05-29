import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

import { SearchService } from './search.service';
import { SearchResult, SearchResults } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit {

  @Output() focused = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<string>();

  searchControl = new FormControl();
  filteredResults$: Observable<SearchResults>;

  private wasSelected = false;

  constructor(private service: SearchService) {
  }

  ngOnInit(): void {
    this.filteredResults$ = this.searchControl.valueChanges
      .pipe(
        filter(_ => !this.wasSelected),
        debounceTime(300),
        map((value: string) => (value && value.length > 3) ? value : undefined),
        switchMap(value => value ? this.service.search(value) : of(undefined))
      );
  }

  select(result: SearchResult) {
    this.wasSelected = true;
    this.selected.emit(result.mediaId);
  }

  onFocus() {
    this.focused.emit(true);
  }

  onBlur() {
    this.focused.emit(false);
    this.reset();
  }

  private reset() {
    this.wasSelected = false;
    this.searchControl.reset();
  }
}
