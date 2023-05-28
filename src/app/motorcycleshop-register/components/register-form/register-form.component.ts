import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoutesConfig} from "../../../app-routing.module";
import {map, NEVER} from "rxjs";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {User} from "../../../auth/model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  errorSubmit: boolean = false;
  errorMessage: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.minLength(5), Validators.required]),
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')])
  });

  constructor(private router: Router,
              public authService: AuthenticationService) {
  }


  onSubmit(): void {
    if (this.form.valid) {
      this.authService.register(
        this.form?.controls['name'].value,
        this.form?.controls['username'].value,
        this.form?.controls['password'].value)
        .pipe(map(data => data as User))
        .subscribe(response =>
        {
          console.log(response)
          this.router.navigateByUrl(RoutesConfig.loginPage).then(r => NEVER)
        }, (error): HttpErrorResponse => {
          console.log(error.error);
          this.errorSubmit = true;
          this.errorMessage = error.error;
          this.form.reset();
          return error;
        });
    }
  }

  onCancel(): void {
    this.router.navigateByUrl(RoutesConfig.loginPage);
  }

  hasMinLengthError = (): boolean =>
    !!this.form?.controls['name'].errors?.hasOwnProperty('minlength');

  hasEmailValidateError = (): boolean =>
    !!this.form?.controls['username'].errors?.hasOwnProperty('email');

  hasMinPatternError = (): boolean =>
    !!this.form?.controls['password'].errors?.hasOwnProperty('pattern');
}
