import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./cocktails/cocktails.module').then((m) => m.CocktailsModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
