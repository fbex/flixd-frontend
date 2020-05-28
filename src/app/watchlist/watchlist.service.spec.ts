import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WatchlistService } from './watchlist.service';
import { Watchlist, WatchlistItem } from './watchlist.model';

describe('WatchlistService', () => {
  let service: WatchlistService;
  let httpMock: HttpTestingController;

  const item: WatchlistItem = {
    mediaId: 'movie-680',
    title: 'Pulp Fiction',
    originalTitle: 'Pulp Fiction',
    releaseDate: '1994-09-10',
    voteAverage: 8.5,
    voteCount: 18684,
    posterPath: '/hOg9USqmQmglmr5kGvpyg1XkhqN.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WatchlistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call to get watchlist from backend', () => {
    const watchlist: Watchlist = {id: 1, items: [item]};

    service.getWatchlist().subscribe(result => {
      expect(result).toEqual(watchlist);
    });

    const request = httpMock.expectOne('/api/watchlist');
    request.flush(watchlist);
    expect(request.request.method).toEqual('GET');
  });

  it('should call to remove a watchlist item', () => {
    service.removeItem('movie-680').subscribe(result => {
      expect(result).toEqual(item);
    });

    const request = httpMock.expectOne('/api/watchlist/item/movie-680');
    request.flush(item);
    expect(request.request.method).toEqual('DELETE');
  });
});
