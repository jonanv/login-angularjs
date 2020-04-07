import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;

  constructor() { }

  ngOnInit(): void {
    this.user = new UserModel();

    this.user.email = 'jonan-vargas23@hotmail.com';
  }

  onSubmit(formRegister: NgForm) {
    if(formRegister.invalid) {
      return;
    }

    console.log("formulario enviado");
    console.log(this.user);
  }

}
