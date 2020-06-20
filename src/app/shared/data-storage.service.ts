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

  storeRecipes(){
    // get the token and send it with "auth" query param
   const token = this.authService.getToken();
   return this.http.put(
     'https://recipe-app-8446e.firebaseio.com/recipes.json?auth='+token,this.recipeService.getRecipes()
     )
  }

  getRecipes(){
    const token = this.authService.getToken();
    return this.http.get('https://recipe-app-8446e.firebaseio.com/recipes.json?auth='+token)
  }
}