import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

// Imports
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.user = new UserModel();
  }

  login(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }

    this.authService.login(this.user)
      .pipe(first())
      .subscribe(response => {
        console.log(response);
      },
        (err) => {
          console.log(err.error.error.message);
        });
  }

}
