import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  token: string;
  constructor(private router: Router) { }

  signUp(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email,password)
       .then(
         (response) => console.log(response)
       )
  }

  signIn(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email,password)
       .then(
         response => {
           this.router.navigate(['/']);
           firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
         }
        )
        .catch(
          (error) => console.log(error)
        )
  }

  getIdToken(){
       firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuth(){
    return this.token != null;
  }

  logout(){
    firebase.auth().signOut();
    this.token = null;
  }

}