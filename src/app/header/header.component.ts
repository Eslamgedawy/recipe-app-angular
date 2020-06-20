import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router) { }

  onSave(){
    this.dataStorage.storeRecipes().subscribe(
      (response: Response) => console.log(response)
    )
  }

  onGet(){
    this.dataStorage.getRecipes()
        .subscribe(
        (response: Response) =>{
        console.log(response.json());
        // put my response to array of recipes
          const recipes: Recipe[] = response.json();
          // update my recipes with fetched recipes
          this.recipeService.recipes = recipes;
        //  use recipesChanged subject to sync data
          this.recipeService.recipesChanged.next([...this.recipeService.recipes])
      }
    )
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}