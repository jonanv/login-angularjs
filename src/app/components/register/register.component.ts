import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = new UserModel();
  }

  onSubmit(formRegister: NgForm) {
    if (formRegister.invalid) {
      return;
    }

    this.authService.newUser(this.user)
      .pipe(first())
      .subscribe(response => {
        console.log(response);
      },
      (err) => {
        console.log(err.error.error.message);
      })
  }

}
