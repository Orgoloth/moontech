import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ListPaginatorComponent } from './components/list-paginator/list-paginator.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { RouterModule } from '@angular/router';
import { cocktailsRoutes } from './cocktails-routes';
import { CocktailsService } from './services/cocktails.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CocktailRepositoryService } from './services/cocktail-repository.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    FilterComponent,
    ListComponent,
    ListItemComponent,
    DetailsPageComponent,
    ListPaginatorComponent,
    ListPageComponent,
  ],
  providers: [CocktailsService, CocktailRepositoryService],
  imports: [
    CommonModule,
    RouterModule.forChild(cocktailsRoutes),
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class CocktailsModule {}
