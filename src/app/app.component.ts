import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
   loadedFeature = 'recipe';

   constructor(private router: Router){

   }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  onLoad(){
    this.router.navigate(['/Shoplist']);
  }
}
