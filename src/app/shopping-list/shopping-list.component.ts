import { Component, OnInit, EventEmitter } from '@angular/core';
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
    // get updatd ingredients with ingredientChanged event
    this.shopServs.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(id: number){
    this.shopServs.startEditing.next(id);
  }
}