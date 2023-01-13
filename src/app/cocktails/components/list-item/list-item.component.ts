import { Component, Input } from '@angular/core';
import { Drink } from '../../interfaces/drink.interface';
import { PATHS } from '../../constants';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() drink: Drink | undefined;
  PATHS = PATHS;
}
