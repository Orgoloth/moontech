import { Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { PATHS } from './constants';

export const cocktailsRoutes: Routes = [
  {
    path: `${PATHS.DETAILS}/:id`,
    component: DetailsPageComponent,
  },
  {
    path: '',
    component: ListPageComponent,
  },
];
