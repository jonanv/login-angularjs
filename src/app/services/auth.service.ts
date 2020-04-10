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
  userToken: string;

  constructor(
    private http: HttpClient
  ) {
    this.readToken();
    console.log(this.userToken);
  }

  getQuery(query, body) {
    const url = `${this.url}${query}?key=${this.apikey}`;
    return this.http.post(url, body);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.userToken = '';
  }

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    }
    return this.getQuery('signInWithPassword', authData).
      pipe(map(response => {
        this.saveToken(response['idToken']);
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
        this.saveToken(response['idToken']);
        return response;
      }));
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let today = new Date();
    today.setSeconds(3600);

    localStorage.setItem('expiresIn', today.getTime().toString());
  }

  readToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userToken = token;
    }
    else {
      this.userToken = '';
    }
    return this.userToken;
  }

  userAutheticate(): boolean {
    if(this.userToken?.length < 2) {
      return false;
    }

    const expiresIn = Number(localStorage.getItem('expiresIn'));
    const dateExpiresIn = new Date();
    dateExpiresIn.setTime(expiresIn);

    if(dateExpiresIn > new Date()) {
      return true;
    }
    else {
      return false;
    }
  }
}
