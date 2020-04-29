import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


@Injectable()
export class ShoppingListService {

  ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }


  getIngredients(){
    return [...this.ingredients];
  }

  addIngredinet(ingred: Ingredient){
    this.ingredients.push(ingred);
    this.ingredientChanged.emit([...this.ingredients]);
  }

  // -----
  addIngredients(ingredients: Ingredient[]){
    for(let ingredient of ingredients){
        this.addIngredinet(ingredient);
    }
  }

}