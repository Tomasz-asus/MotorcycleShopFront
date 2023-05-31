import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {Router} from '@angular/router';
import {RoutesConfig} from '../../../app-routing.module';
import {map, switchMap, tap} from 'rxjs';
import {AuthResponse} from '../../../auth/model/authResponse';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MotorcycleshopService} from '../../../api/service/motorcycleshop.service';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  errorSubmit: boolean = false;
  errorMessage: string = 'Wrong username or password';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(public auth: AuthenticationService,
              public tokenStorage: TokenStorageService, private router: Router,
              public jwtHelper: JwtHelperService, private service: MotorcycleshopService) {
  }

  ngOnInit(): void {
    if (!this.jwtHelper.isTokenExpired()) {
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.auth.login(
        this.form?.controls['username'].value,
        this.form?.controls['password'].value)
        .pipe(
          map(data => data as AuthResponse),
          tap(response => this.tokenStorage.saveTokens(response.access_token, response.refresh_token)),
          switchMap(() => this.service.getProductsFromBasket()))
        .subscribe(() => {
            this.router.navigateByUrl(RoutesConfig.productsPage);
          },
          (error): HttpErrorResponse => {
            console.log(this.errorMessage);
            this.errorSubmit = true;
            return error
          });
    }
  }

  hasRequiredError = (): boolean =>
    !!(this.form?.controls['username'].errors?.hasOwnProperty('required')
      && this.form?.controls['username'].touched);
  hasPasswordRequiredError = (): boolean =>
    !!(this.form?.controls['password'].errors?.hasOwnProperty('required')
      && this.form?.controls['password'].touched);


  OnRegister() {
    this.router.navigateByUrl(RoutesConfig.registerPage);
  }

  onCancel() {
    this.router.navigateByUrl(RoutesConfig.productsPage);
  }

  onLogOut() {
    this.tokenStorage.clearTokens();
    this.service.clearProductsAndCounter();
    this.router.navigateByUrl(RoutesConfig.loginPage);
  }
}
