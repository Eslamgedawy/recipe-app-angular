import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    // emmited recipeSelected
    recipeSelected = new EventEmitter<Recipe>();
    
    recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://d1doqjmisr497k.cloudfront.net/-/media/mccormick-us/recipes/mccormick/q/800/quick_and_easy_french_toast_new_800x800.jpg?vd=20191111T152624Z&hash=F75037210F12A55466D9F0B7EDCA742701ABF16B'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://lilluna.com/wp-content/uploads/2017/10/spanish-rice-resize-6.jpg')
  ];

  getRecipes(){
    return [...this.recipes];
  }
  constructor() { }

}