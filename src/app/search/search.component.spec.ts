import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import SpyObj = jasmine.SpyObj;

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
import { of } from 'rxjs';
import { SearchResults } from './search.model';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SpyObj<SearchService>;

  const searchResults: SearchResults = {
    results: [ {
      mediaId: 'movie-680',
      title: 'Pulp Fiction',
      originalTitle: 'Pulp Fiction',
      releaseDate: '1994-09-10',
      voteAverage: 8.5,
      posterPath: '/hOg9USqmQmglmr5kGvpyg1XkhqN.jpg'
    }, {
      mediaId: 'movie-603',
      title: 'Matrix',
      originalTitle: 'The Matrix',
      releaseDate: '1999-03-30',
      voteAverage: 8.1,
      posterPath: '/vybQQ7w7vGvF53IsGD0y0JSgIsA.jpg'
    } ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatAutocompleteModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ SearchComponent ],
      providers: [{
        provide: SearchService,
        useValue: jasmine.createSpyObj('SearchService', [ 'search' ])
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService) as SpyObj<SearchService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for inputted value',  async () => {
    searchService.search.and.returnValue(of(searchResults));

    expect(document.querySelectorAll('mat-option').length).toBe(0);

    setInputValue('pulp');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(document.querySelectorAll('mat-option').length).toBe(2);
    expect(document.querySelectorAll('mat-option').item(0).textContent).toEqual(' Pulp Fiction (1994-09-10)');
    expect(document.querySelectorAll('mat-option').item(1).textContent).toEqual(' The Matrix (1999-03-30)');

    expect(searchService.search).toHaveBeenCalledWith('pulp');
  });

  it('should trigger selected event when option is selected',  async () => {
    spyOn(component.selected, 'emit');
    searchService.search.and.returnValue(of(searchResults));

    setInputValue('pulp');
    await fixture.whenStable();
    fixture.detectChanges();

    const option = document.querySelectorAll('mat-option').item(0) as HTMLElement;
    option.click();
    fixture.detectChanges();

    expect(component.selected.emit).toHaveBeenCalledWith('movie-680');
  });

  it('should trigger focused event on focus and blur', () => {
    spyOn(component.focused, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input#search');

    inputElement.dispatchEvent(new Event('focus'));
    expect(component.focused.emit).toHaveBeenCalledWith(true);

    inputElement.dispatchEvent(new Event('blur'));
    expect(component.focused.emit).toHaveBeenCalledWith(false);
  });

  function setInputValue(value: string) {
    const inputElement = fixture.nativeElement.querySelector('input#search');
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input'));
  }
});
