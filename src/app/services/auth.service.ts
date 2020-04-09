import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Imports
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyA5tkcjwPPJn_7AWX5nuH7xWBCA4tp3_4A';

  constructor(
    private http: HttpClient
  ) {

  }

  // getQuery(query) {
  //   const url = `${ this.url }${ query }`;
  //   return this.http.post(url, {  });
  // }

  logout() {
    // this.getQuery('')
    // .pipe(map(response => {

    // }))
  }

  login(user: UserModel) {

  }

 newUser(user: UserModel) {

 }
}
