import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITEMS_PER_PAGE } from '../../constants';

@Component({
  selector: 'app-list-paginator',
  templateUrl: './list-paginator.component.html',
  styleUrls: ['./list-paginator.component.scss'],
})
export class ListPaginatorComponent {
  @Input() actualPage: number = 0;
  @Input() totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  prev = () => {
    if (this.actualPage > 0) this.pageChange.emit(this.actualPage - 1);
  };
  next = () => {
    if (this.actualPage < this.totalPages() - 1)
      this.pageChange.emit(this.actualPage + 1);
  };

  specific = (page: number) => this.pageChange.emit(page);

  totalPages = (): number => Math.ceil(this.totalItems / ITEMS_PER_PAGE);
}
