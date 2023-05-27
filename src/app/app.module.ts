import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MotorcycleshopProductsModule} from "./motorcycleshop-products/motorcycleshop-products.module";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {MotorcycleshopBasketModule} from "./motorcycleshop-basket/motorcycleshop-basket.module";
import {MotorcycleshopLoginModule} from "./motorcycleshop-login/motorcycleshop-login.module";
import {JwtModule} from "@auth0/angular-jwt";
import {MotorcycleshopRegisterModule} from "./motorcycleshop-register/motorcycleshop-register.module";
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth/services/auth.guard";
import {MotorcycleshopHomeModule} from "./motorcycleshop-home/motorcycleshop-home.module";
import {MotorcycleshopOrderModule} from "./motorcycleshop-order/motorcycleshop-order.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoadingInterceptorService} from "./auth/services/loading-interceptor.service";


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MotorcycleshopProductsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    MotorcycleshopBasketModule,
    MotorcycleshopLoginModule,
    MotorcycleshopRegisterModule,
    AuthModule,
    MotorcycleshopHomeModule,
    MotorcycleshopOrderModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://localhost:8080/api/login", "http://localhost:8080/shop/products",
          "http://localhost:8080/api/user"],
        throwNoTokenError: true,
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
