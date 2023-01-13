import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { Drink } from '../interfaces/drink.interface';
import { environment } from '../../../environments/environment';
import { DrinksResponse } from '../interfaces/drinks-response.interface';

@Injectable()
export class CocktailRepositoryService {
  constructor(private readonly http: HttpService) {}

  searchByName = (name: string): Observable<Drink[]> =>
    this.http
      .request<DrinksResponse>({
        baseURL: environment.COCKTAIL_API.BASE_URL,
        url: environment.COCKTAIL_API.ENPOINTS.SEARCH,
        params: { s: name },
      })
      .pipe(
        map(({ drinks }) => drinks),
        catchError((error) => {
          console.log(error.message);
          return of([]);
        })
      );

  byId = (id: string): Observable<Drink> =>
    this.http
      .request<DrinksResponse>({
        baseURL: environment.COCKTAIL_API.BASE_URL,
        url: environment.COCKTAIL_API.ENPOINTS.LOOKUP,
        params: { i: id },
      })
      .pipe(
        map(({ drinks }) => drinks[0]),
        catchError((error) => {
          console.log(error.message);
          return of({} as Drink);
        })
      );

  searchByIngredient = (ingredient: string): Observable<Drink[]> =>
    this.http
      .request<DrinksResponse>({
        baseURL: environment.COCKTAIL_API.BASE_URL,
        url: environment.COCKTAIL_API.ENPOINTS.FILTER,
        params: { i: ingredient },
      })
      .pipe(
        map(({ drinks }) => drinks),
        catchError((error) => {
          console.log(error.message);
          return of([]);
        })
      );

  searchByCategory = (category: string): Observable<Drink[]> =>
    this.http
      .request<DrinksResponse>({
        baseURL: environment.COCKTAIL_API.BASE_URL,
        url: environment.COCKTAIL_API.ENPOINTS.FILTER,
        params: { c: category },
      })
      .pipe(
        map(({ drinks }) => drinks),
        catchError((error) => {
          console.log(error.message);
          return of([]);
        })
      );

  searchByGlass = (glass: string): Observable<Drink[]> =>
    this.http
      .request<DrinksResponse>({
        baseURL: environment.COCKTAIL_API.BASE_URL,
        url: environment.COCKTAIL_API.ENPOINTS.FILTER,
        params: { g: glass },
      })
      .pipe(
        map(({ drinks }) => drinks),
        catchError((error) => {
          console.log(error.message);
          return of([]);
        })
      );
}
