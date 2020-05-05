import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable()
export class ShoppingListService {

  // ingredientChanged = new EventEmitter<Ingredient[]>();
    ingredientChanged = new Subject<Ingredient[]>();
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
    // emit all ingredients 
    this.ingredientChanged.next([...this.ingredients]);
  }

  
  addIngredients(ingredients: Ingredient[]){
    // split the array elements
    this.ingredients.push(...ingredients);
  }

}