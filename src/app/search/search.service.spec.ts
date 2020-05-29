import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { SearchResults } from './search.model';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search a given query via the backend', () => {
    const searchResults: SearchResults = {
      results: [{
        mediaId: 'movie-680',
        title: 'Pulp Fiction',
        originalTitle: 'Pulp Fiction',
        releaseDate: '1994-09-10',
        voteAverage: 8.5,
        posterPath: '/hOg9USqmQmglmr5kGvpyg1XkhqN.jpg'
      }]
    };

    service.search('pulp').subscribe(results => {
      expect(results).toEqual(searchResults);
    });

    const request = httpMock.expectOne('/api/media/search');
    request.flush(searchResults);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({query: 'pulp'});
  });
});
