import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable()
export class AuthService {

  constructor() { }

  signUp(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email,password)
       .then(
         (response) => console.log(response)
       )
  }

  signIn(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email,password)
       .then(
         (response) => console.log(response)
        )
        .catch(
          (error) => console.log(error)
        )
  }

}