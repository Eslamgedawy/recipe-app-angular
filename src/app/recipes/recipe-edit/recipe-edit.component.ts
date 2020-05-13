import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
              private recipeService: RecipeService,
              private router: Router) { }

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
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[
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
      'imagePath': new FormControl(imagePath,Validators.required),
      'description': new FormControl(desc,Validators.required),
      'ingredients': ingredientsArray
    })
  }

  onSubmit(){ 
    console.log(this.myForm);
    // const newRecipe = new Recipe(
    //   this.myForm.value['name'],
    //   this.myForm.value['description'],
    //   this.myForm.value['imagePath'],
    //   this.myForm.value['ingredients'],
    // )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.myForm.value);
    }
    else{
      this.recipeService.addRecipe(this.myForm.value);
    }
    // call onCancel method to go away to recipe-details
    this.onCancel()
  }

  onCancel(){
      this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.myForm.get('ingredients')).removeAt(index);
  }

  // add ingredient form
  onAddIngredients(){
    // push form group to 
    (<FormArray>this.myForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,Validators.required),
      })
    )
  }

  

}