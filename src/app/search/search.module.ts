import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { SearchComponent } from './search.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ SearchComponent ],
  exports: [
    SearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class SearchModule { }
