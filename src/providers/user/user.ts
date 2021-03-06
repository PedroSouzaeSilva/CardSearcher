import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api,
    public alertController: AlertController,
    private authenticator: AngularFireAuth,
    private facebook: Facebook,
    private storage: Storage) {

  }

  async register(accountInfo) {
    try {
      var r = await this.authenticator.auth.createUserWithEmailAndPassword(
        accountInfo.email,
        accountInfo.password
      );
      if (r) {
        console.log("Successfully registered!");
        return true;
      }

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async login(accountInfo) {
    try {
      let result = await this.authenticator.auth.signInWithEmailAndPassword(
        accountInfo.email,
        accountInfo.password
      );
      if (result) {
        this._user = result;
        this.storage.set('user', this._user);
        let alert = await this.alertController.create({
          title: 'Login',
          message: 'Login realizado com sucesso',
          buttons: ['OK']
        });
    
        await alert.present();
        return result;
      }

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async loginWithFacebook() {
    try{
      let result = await this.authenticator.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      
      /*    Login no Celular
      let result = await this.facebook.login(['email']);
      const fbCredential = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
      await firebase.auth().signInWithCredential(fbCredential);
      */
     if(result.user){
       this._user = result;
       this.storage.set('user', this._user);
      let alert = await this.alertController.create({
        title: 'Login',
        message: 'Login realizado com sucesso',
        buttons: ['OK']
      });
      await alert.present();
     }
     
    }catch(err){
      console.error(err);
    }
  }

  async logout() {
    await this.authenticator.auth.signOut();
    this.storage.set('user', undefined);
    let alert = await this.alertController.create({
      title: 'Logout',
      message: 'Logout realizado com sucesso',
      buttons: ['OK']
    });
    await alert.present();
  }
  

  checkLoginState(){
    this.authenticator.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log("The user is logged in!"); 
        
      }else
      {
        console.log("The user is not logged in!");
      }
      return;
    });
  }

}
