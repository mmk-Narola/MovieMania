import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchComponent } from './components/search/search.component';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieRatingComponent } from './components/movie-rating/movie-rating.component';
import { MovieFilterComponent } from './components/movie-filter/movie-filter.component';
import { MovieSortComponent } from './components/movie-sort/movie-sort.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ConvertMinToHourPipe } from './pipes/convert-min-to-hour.pipe';
import { SimilarMoviesComponent } from './components/similar-movies/similar-movies.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, SearchComponent, PageNotFoundComponent, HomeComponent, LoginComponent, UserRegistrationComponent, MovieCardComponent, MovieRatingComponent, MovieFilterComponent, MovieSortComponent, MovieDetailsComponent, ConvertMinToHourPipe, SimilarMoviesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
