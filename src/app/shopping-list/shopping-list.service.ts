import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable()
export class ShoppingListService {

  // subject to make ingredients sync
  ingredientChanged = new Subject<Ingredient[]>();

  startEditing = new Subject<number>();

  // some fake ingredients
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  // get all ingredients
  getIngredients(){
    return [...this.ingredients];
  }

  // get single ingredient by index
  getIngredient(index: number){
    return this.ingredients[index];
  }

  // push new ingredient 
  addIngredinet(ingred: Ingredient){
    this.ingredients.push(ingred);
    // emit all ingredients 
    this.ingredientChanged.next([...this.ingredients]);
  }

  // update ingredient with the its index
  updateIngredient(index: number,newIngedient: Ingredient){
      this.ingredients[index] = newIngedient;
      this.ingredientChanged.next([...this.ingredients]);
  }

  // delete ingredient by index
  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next([...this.ingredients]);
  }

  
  // using spread operator to send ingredients
  addIngredients(ingredients: Ingredient[]){
    // split the array elements
    this.ingredients.push(...ingredients);
  }

}