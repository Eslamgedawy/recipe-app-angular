import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RouterModule } from '@angular/router';

const appRoutes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }, 
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'Shoplist',
    component: ShoppingListComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }