import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { QUERY_KEYS } from '../../constants';
import { SearchFormData } from '../../interfaces/search-form.data';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() submitOutput = new EventEmitter<SearchFormData>();
  form: FormGroup | undefined;
  QUERY_KEYS = QUERY_KEYS;
  private readonly unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.form = new FormGroup({
      key: new FormControl(),
      value: new FormControl(),
    });
    this.submitOutput.emit(this.form.getRawValue());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit() {
    this.submitOutput.emit(this.form?.getRawValue());
  }
}
