import { Component, OnInit,ViewChild, ElementRef, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  index: number;
  editMode= false;
  @ViewChild('f') form: NgForm;
  EditingIngredient: Ingredient;
  sub: Subscription;
  constructor(private shopServ: ShoppingListService) { }

  ngOnInit() {
    // subscribe to editing
   this.sub = this.shopServ.startEditing.subscribe(
      (index: number) =>{
        this.index = index;
        this.editMode = true;
        this.EditingIngredient = this.shopServ.getIngredient(index);
        console.log(this.EditingIngredient)
        // update the form with the EditingIngredient 
        this.form.setValue({
          name: this.EditingIngredient.name,
          amount: this.EditingIngredient.amount
        })
      }
    )
  }

  onAddItem(form: NgForm) {
    console.log(form);
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode){
      // update my current ingredient
      this.shopServ.editIngredient(this.index,newIngredient);
    }else{
      this.shopServ.addIngredinet(newIngredient);
    }
    this.form.reset();
    this.editMode = false;
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shopServ.deleteIngredient(this.index);
    this.onClear()
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
    //  @ViewChild('nameInput',null) nameInputRef: ElementRef;
    // @ViewChild('amountInput',null) amountInputRef: ElementRef;
    // @Output() ingredientAdded = new EventEmitter<Ingredient>();

    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientAdded.emit(newIngredient);
}