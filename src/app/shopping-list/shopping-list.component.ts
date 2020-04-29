import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  constructor(private shopServs: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shopServs.getIngredients();

    this.shopServs.ingredientChanged.subscribe(
      (ingredients: Ingredient) => {
        this.ingredients = ingredients
      }
    )
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   // this.ingredients.push(ingredient);
  //   this.shopServs.addIngredinet(ingredient)
  // }


//  ingredients: Ingredient[] = [
//     new Ingredient('Apples', 5),
//     new Ingredient('Tomatoes', 10),
//   ];
}