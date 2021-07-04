import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators'



@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string){

    var result = null

    try {

      result = await this.afAuth.signInWithEmailAndPassword(email, password)
      
    } catch (error) {
      
      result = error

    }

    return result
    
  }

  async signIn(email: string, password: string){

    var result = null

    try {
      
      result = await this.afAuth.createUserWithEmailAndPassword(email, password);

    } catch (error) {
      
      result = error
      
    }

    return result

  }

  async getCurrentUser(){

    return this.afAuth.authState.pipe(first()).toPromise();

  }

  logout(){

    this.afAuth.signOut();

  }


}
