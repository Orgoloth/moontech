import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Drink } from '../../interfaces/drink.interface';
import { SearchFormData } from '../../interfaces/search-form.data';
import { ITEMS_PER_PAGE, QUERY_KEYS } from '../../constants';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  drinksPage: Drink[] = [];
  page: number = 0;
  private drinks: Drink[] = [];
  private readonly unsubscribe$ = new Subject<void>();
  private readonly keys$ = new Subject<{
    key: string;
    value: string;
  }>();

  constructor(public readonly service: CocktailsService) {}

  get totalDrinks(): number {
    return this.drinks?.length || 0;
  }

  ngOnInit(): void {
    this.keys$
      .pipe(
        switchMap(({ key, value }) => {
          switch (key) {
            case QUERY_KEYS.NAME:
              return this.service.name(value);
            case QUERY_KEYS.GLASS:
              return this.service.glass(value);
            case QUERY_KEYS.INGREDIENT:
              return this.service.ingredient(value);
            case QUERY_KEYS.CATEGORY:
              return this.service.category(value);
            default:
              return of([]);
          }
        }),
        catchError((error) => {
          console.log(error.message);
          return of([]);
        }),

        takeUntil(this.unsubscribe$)
      )
      .subscribe((drinks) => {
        this.drinks = drinks;
        this.paginate();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search({ key, value }: SearchFormData): void {
    this.keys$.next({ key, value });
  }

  pageChange($event: number): void {
    this.page = $event;
    this.paginate();
  }

  private paginate(): void {
    const start = (this.page ?? 0) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    this.drinksPage = this.drinks?.slice(start, end);
  }
}
