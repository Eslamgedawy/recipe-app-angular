import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  myForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode)
        this.formInit()
      }
    )
  }

  formInit(){
    let recipeName = '';
    let imagePath = '';
    let desc = '';
    let ingredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      desc = recipe.description;
      // check if we have ingredients or not 
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          ingredients.push(
            new FormGroup({
              'ingredientName': new FormControl(ingredient.name),
              'ingredientAmount': new FormControl(ingredient.amount),
            })
          )
        }
      }
    }
    this.myForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imgPath': new FormControl(imagePath),
      'desc': new FormControl(desc),
      'ingredients': ingredients
    })
  }


  onSubmit(){
    console.log(this.myForm)
  }

}