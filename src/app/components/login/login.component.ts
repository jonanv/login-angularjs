import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

// Imports
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.user = new UserModel();
  }

  login(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.login(this.user)
      .pipe(first())
      .subscribe(response => {
        console.log(response);
        Swal.close();
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autentificar',
          text: err.error.error.message
        });
      });
  }

}
