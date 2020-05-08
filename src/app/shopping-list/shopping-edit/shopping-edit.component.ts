import { Component, OnInit,ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shopServ: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    console.log(form);
     console.log(form.value.name);
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.shopServ.addIngredinet(newIngredient);
  }

    //  @ViewChild('nameInput',null) nameInputRef: ElementRef;
    // @ViewChild('amountInput',null) amountInputRef: ElementRef;
    // @Output() ingredientAdded = new EventEmitter<Ingredient>();

    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientAdded.emit(newIngredient);
}