import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { DataStorageService } from './shared/data-storage.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  imports:[ 
       BrowserModule, 
       FormsModule,
       ReactiveFormsModule, 
       AppRoutingModule, 
       HttpModule ],
  declarations:[ 
       AppComponent, 
       HeaderComponent, 
       RecipesComponent, 
       RecipeListComponent, 
       RecipeItemComponent, 
       RecipeDetailComponent, 
       ShoppingListComponent, 
       ShoppingEditComponent, 
       DropdownDirective, 
       RecipeStartComponent, 
       RecipeEditComponent, SignupComponent, SigninComponent ],
  bootstrap:[ AppComponent ],
  providers:[
       RecipeService, 
       ShoppingListService, 
       DataStorageService, AuthService,AuthGuard]
})
export class AppModule { }
