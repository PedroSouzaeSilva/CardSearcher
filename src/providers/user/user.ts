import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AngularFireAuth } from 'angularfire2/auth';


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

  constructor(public api: Api, private authenticator: AngularFireAuth) {

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
      var r = await this.authenticator.auth.signInWithEmailAndPassword(
        accountInfo.email,
        accountInfo.password
      );
      if (r) {
        console.log("Successfully logged in!");
        return true;
      }

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  logout() {
    this.authenticator.auth.signOut();
  }
}
