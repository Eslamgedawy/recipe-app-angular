import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeServs: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.recipeServs.recipesChanged.subscribe(
      (recipes: Recipe[])=>{
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeServs.getRecipes();
  }

  onAdd(){
    this.router.navigate(['/recipes','new'])
  }



// --------------old way---------

  // recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://d1doqjmisr497k.cloudfront.net/-/media/mccormick-us/recipes/mccormick/q/800/quick_and_easy_french_toast_new_800x800.jpg?vd=20191111T152624Z&hash=F75037210F12A55466D9F0B7EDCA742701ABF16B'),
  //   new Recipe('Another Test Recipe', 'This is simply a test', 'https://lilluna.com/wp-content/uploads/2017/10/spanish-rice-resize-6.jpg')
  // ];

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  // onRecipeSelected(recipe: Recipe) {
  //  this.recipeWasSelected.emit(recipe);
  // }
}