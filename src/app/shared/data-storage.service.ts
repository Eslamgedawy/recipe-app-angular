import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,private recipeService: RecipeService) { }

  // put method

  storeRecipes(){
   return this.http.put('https://recipe-app-8446e.firebaseio.com/recipes.json',this.recipeService.getRecipes())
  }

  getRecipes(){
    return this.http.get('https://recipe-app-8446e.firebaseio.com/recipes.json')
      .subscribe(
          (response: Response) =>{
          console.log(response.json());
          // put my response to array of recipes
           const recipes: Recipe[] = response.json();
           // update my recipes with fetched recipes
           this.recipeService.recipes = recipes;
          //  use recipesChanged subject to sync data
           this.recipeService.recipesChanged.next([...this.recipeService.recipes])

          //  this.recipeService.setRecipes(recipes)
        }
      )
  }

}