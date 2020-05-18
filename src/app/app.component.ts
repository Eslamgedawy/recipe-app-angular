import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

   constructor(){

   }

    config = {
           apiKey: "AIzaSyDa8L03bXERlU8emv8rjX71WLF1ClTAWD0",
           authDomain: "recipe-app-8446e.firebaseapp.com",
    };

   ngOnInit(){
     firebase.initializeApp(this.config)
   }

}
