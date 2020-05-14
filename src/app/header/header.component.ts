import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSave(){
    this.dataStorage.storeRecipes().subscribe(
      (response: Response) => console.log(response)
    )
  }

  onGet(){
    this.dataStorage.getRecipes();
  }

}