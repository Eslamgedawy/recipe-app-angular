import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
    let ingredientsArray = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      desc = recipe.description;
      // check if we have ingredients or not and show them in FormGroup
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          ingredientsArray.push(
            new FormGroup({
              'ingredientName': new FormControl(ingredient.name,Validators.required),
              'ingredientAmount': new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern("^[1-9]+[0-9]*$")
                ]),
            })
          )
        }
      }
    }
    this.myForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imgPath': new FormControl(imagePath,Validators.required),
      'desc': new FormControl(desc,Validators.required),
      'ingredients': ingredientsArray
    })
  }

  // add ingredient form
  onAddIngredients(){
    // push form group to 
    (<FormArray>this.myForm.get('ingredients')).push(
      new FormGroup({
        'ingredientName': new FormControl(null,Validators.required),
        'ingredientAmount': new FormControl(null,Validators.required),
      })
    )
  }

  onSubmit(){
    console.log(this.myForm);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.myForm.value)
    }
    else{
      this.recipeService.addRecipe(this.myForm.value)
    }
  }

}