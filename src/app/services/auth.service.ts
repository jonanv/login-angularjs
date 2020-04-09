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

  private url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey: string = 'AIzaSyA5tkcjwPPJn_7AWX5nuH7xWBCA4tp3_4A';

  constructor(
    private http: HttpClient
  ) {

  }

  getQuery(query, body) {
    const url = `${this.url}${query}?key=${this.apikey}`;
    return this.http.post(url, body);
  }

  logout() {

  }

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    }
    return this.getQuery('signInWithPassword', authData).
      pipe(map(response => {
        return response;
      }));
  }

  newUser(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    }
    return this.getQuery('signUp', authData)
      .pipe(map(response => {
        return response;
      }));
  }
}
