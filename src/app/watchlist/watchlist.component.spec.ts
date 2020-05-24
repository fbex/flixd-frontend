import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { WatchlistComponent } from './watchlist.component';
import { WatchlistService } from './watchlist.service';
import { of } from 'rxjs';
import { WatchlistItem } from './watchlist.model';
import { By } from '@angular/platform-browser';
import { WatchlistItemComponent } from './watchlist-item/watchlist-item.component';
import SpyObj = jasmine.SpyObj;
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let watchlistService: SpyObj<WatchlistService>;

  const item: WatchlistItem = {
    mediaId: 'movie-680',
    title: 'Pulp Fiction',
    originalTitle: 'Pulp Fiction',
    releaseDate: '1994-09-10',
    voteAverage: 8.5,
    voteCount: 18684,
    posterPath: '/hOg9USqmQmglmr5kGvpyg1XkhqN.jpg'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ WatchlistComponent, WatchlistItemComponent ],
      providers: [{
        provide: WatchlistService,
        useValue: jasmine.createSpyObj('WatchlistService', ['getWatchlist', 'removeItem'])
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // due to material stuff of sub-component
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    watchlistService = TestBed.inject(WatchlistService) as SpyObj<WatchlistService>;
    watchlistService.getWatchlist.and.returnValue(of({id: 1, items: [item, item, item]}));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all watchlist items', async(() => {
    const items = fixture.nativeElement.querySelectorAll('div app-watchlist-item');
    expect(items.length).toEqual(3);
  }));

  it('should trigger remove call on remove event', () => {
    spyOn(component, 'onRemoved').and.callThrough();
    watchlistService.removeItem.and.returnValue(of(item));
    const firstItem = fixture.debugElement.query(By.directive(WatchlistItemComponent)).componentInstance;

    firstItem.removed.emit('movie-680');

    expect(component.onRemoved).toHaveBeenCalledWith('movie-680');
    expect(watchlistService.removeItem).toHaveBeenCalledWith('movie-680');
    expect(watchlistService.getWatchlist).toHaveBeenCalled();
  });
});
