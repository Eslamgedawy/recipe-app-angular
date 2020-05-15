import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    // subject object to make may recipes sync
    recipesChanged = new Subject<Recipe[]>();

    // some dummy recipes
    recipes: Recipe[] = [
            new Recipe(
              'Tasty Schnitzel',
              'A super-tasty Schnitzel - just awesome!',
              'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
              [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
              ]),
            new Recipe(
              'Big Fat Burger',
              'Mac Chicken Woo',
              'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
              [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
              ])
          ];
   
    constructor(private slService: ShoppingListService) { }

    // get all recipes
    getRecipes(){
      return [...this.recipes];
    }

    // send all ingredients to shopping list using ShoppingListService
    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    // get single recipe
     getRecipe(index: number){
       return this.recipes[index];
     }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next([...this.recipes]);
    }

    updateRecipe(index: number, updatedRecipe: Recipe){
      this.recipes[index] = updatedRecipe;
      this.recipesChanged.next([...this.recipes]);
    }

    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next([...this.recipes]);
    }
}