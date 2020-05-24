import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { WatchlistItemComponent } from './watchlist-item.component';
import { WatchlistItem } from '../watchlist.model';

describe('WatchlistItemComponent', () => {
  let component: WatchlistItemComponent;
  let fixture: ComponentFixture<WatchlistItemComponent>;

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
      imports: [ MatIconModule, MatCardModule ],
      declarations: [ WatchlistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all elements', () => {
    const card = fixture.nativeElement.querySelector('mat-card.watchlist-card') as HTMLElement;
    expect(card).toBeTruthy();
    expect(card.querySelector('div.card-body-left img').attributes.getNamedItem('src').value)
        .toEqual('https://image.tmdb.org/t/p/w154/hOg9USqmQmglmr5kGvpyg1XkhqN.jpg');
    expect(card.querySelector('div.card-body-right mat-card-title').textContent).toEqual('Pulp Fiction');
    expect(card.querySelector('div.card-body-right mat-card-subtitle').textContent).toEqual('1994');
    expect(card.querySelector('div.card-body-right mat-card-content div.tmdb-rating div.tmdb-score').textContent).toEqual('8.5');
  });

  it('should trigger delete event on click', () => {
    spyOn(component.removed, 'emit');
    fixture.nativeElement.querySelector('button#remove').click();
    fixture.detectChanges();

    expect(component.removed.emit).toHaveBeenCalledWith('movie-680');
  });
});
