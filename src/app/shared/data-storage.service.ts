import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  // put method

  storeRecipes(){
    const token = this.authService.getIdToken();
   return this.http.put('https://recipe-app-8446e.firebaseio.com/recipes.json?auth='+token,this.recipeService.getRecipes())
  }

  getRecipes(){
    const token = this.authService.getIdToken();

    return this.http.get('https://recipe-app-8446e.firebaseio.com/recipes.json?auth='+token)
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

}