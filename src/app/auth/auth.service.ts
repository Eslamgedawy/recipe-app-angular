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
         () => {
           this.router.navigate(['/']);
           // store the cuurent token 
           firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token
                console.log(this.token)
                }
            )
         }
        )
        .catch(
          (error) => console.log(error)
        )
  }

  // get token of current user 
  getToken(){
      //  firebase.auth().currentUser.getIdToken()
      //   .then(
      //     (token: string) => this.token = token
      //   );
    return this.token;
  }

  // check if user is auth
  isAuth(){
    return this.token != null;
  }

  // sign out and reset the current token
  logout(){
    firebase.auth().signOut();
    this.token = null;
  }

}