import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drink } from '../interfaces/drink.interface';
import { CocktailRepositoryService } from './cocktail-repository.service';

@Injectable()
export class CocktailsService {
  constructor(private readonly cocktails: CocktailRepositoryService) {}

  cocktailById = (id: string) => this.cocktails.byId(id);

  name = (name: string): Observable<Drink[]> =>
    this.cocktails.searchByName(name);

  glass = (glass: string): Observable<Drink[]> =>
    this.cocktails.searchByGlass(glass);

  ingredient = (ingredient: string): Observable<Drink[]> =>
    this.cocktails.searchByIngredient(ingredient);

  category = (category: string): Observable<Drink[]> =>
    this.cocktails.searchByCategory(category);
}
