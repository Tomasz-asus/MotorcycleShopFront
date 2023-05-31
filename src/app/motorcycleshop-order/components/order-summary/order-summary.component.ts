import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MotorcycleshopService} from '../../../api/service/motorcycleshop.service';
import {RoutesConfig} from '../../../app-routing.module';
import {Order} from '../../../api/model/order';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {map, switchMap, tap} from 'rxjs';
import {AuthResponse} from '../../../auth/model/authResponse';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {

  errorSubmit: boolean = false;
  errorMessage: string = 'Wrong username or password';

  orderForm = new FormGroup({
    firstAndLastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    street: new FormControl('', [Validators.required]),
    postal: new FormControl('', [Validators.pattern('\\d{2}-\\d{3}'), Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern('^[0-9\\-\\+\\s*]{9,15}$'), Validators.required])
  });

  constructor(private router: Router, private tokenStorage: TokenStorageService,
              private service: MotorcycleshopService, private authService: AuthenticationService) {
  }

  onSubmit(): void {
    if (this.orderForm.valid) {

      let order: Order = {
        firstAndLastName: this.orderForm.controls['firstAndLastName'].value,
        street: this.orderForm.controls['street'].value,
        postalCode: this.orderForm.controls['postal'].value,
        city: this.orderForm.controls['city'].value,
        phoneNumber: this.orderForm.controls['phoneNumber'].value,
        username: this.tokenStorage.getUserNameFromToken(),
        basketName: this.tokenStorage.getBasketName()
      }

      this.service.makeOrder(order).subscribe(() => {
          this.authService.refreshToken()
            .pipe(
              map(data => data as AuthResponse),
              tap(response => this.tokenStorage.saveTokens(response.access_token, response.refresh_token)),
              switchMap(() => this.service.getProductsFromBasket()))
            .subscribe(() => {
                this.router.navigateByUrl(RoutesConfig.basketPage);
              },
              (error): HttpErrorResponse => {
                console.log(error.error);
                this.errorMessage = error.error;
                this.errorSubmit = true;
                return error
              });
        }
      )
    }
  }

  onCancel(): void {
    this.router.navigateByUrl(RoutesConfig.loginPage);
  }

  hasMinLengthError = (): boolean =>
    !!this.orderForm?.controls['firstAndLastName'].errors?.hasOwnProperty('minlength');

  hasPhoneNumberError = (): boolean =>
    !!this.orderForm?.controls['phoneNumber'].errors?.hasOwnProperty("pattern")

  hasMinPatternError = (): boolean =>
    !!this.orderForm?.controls['postal'].errors?.hasOwnProperty('pattern');
}
