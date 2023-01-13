import { Component, OnDestroy, OnInit } from '@angular/core';
import { Drink } from '../../interfaces/drink.interface';
import { CocktailsService } from '../../services/cocktails.service';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  drink: Drink | undefined;
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    public readonly service: CocktailsService,
    private route: ActivatedRoute
  ) {}

  get ingredients(): string[] {
    return this.extract({ drink: this.drink, partialKey: 'Ingredient' });
  }

  get measures(): string[] {
    return this.extract({ drink: this.drink, partialKey: 'Measure' });
  }

  get isDrink(): boolean {
    return this.drink?.hasOwnProperty('idDrink') || false;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => this.service.cocktailById(id)),
        catchError((error) => {
          console.log(error.message);
          return of({} as Drink);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((drink) => (this.drink = drink));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private extract({
    drink,
    partialKey,
  }: {
    drink?: Drink;
    partialKey: string;
  }): string[] {
    return drink
      ? Object.entries(drink)
          .filter(([key]) => key.includes(partialKey))
          .map(([, value]) => value)
          .filter((item) => !!item)
      : [];
  }
}
