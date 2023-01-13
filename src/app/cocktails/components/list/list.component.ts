import { Component, Input } from '@angular/core';
import { Drink } from '../../interfaces/drink.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() drinks: Drink[] = [];

  trackByItems(index: number, item: Drink): number {
    return Number(item.idDrink);
  }
}
