import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MotorcycleshopProductsPageComponent} from "./motorcycleshop-products/pages/motorcycleshop-products-page/motorcycleshop-products-page.component";
import {MotorcycleshopBasketPageComponent} from "./motorcycleshop-basket/pages/motorcycleshop-basket-page/motorcycleshop-basket-page.component";
import {MotorcycleshopLoginPageComponent} from "./motorcycleshop-login/page/motorcycleshop-login-page/motorcycleshop-login-page.component";
import {MotorcycleshopRegisterPageComponent} from "./motorcycleshop-register/pages/motorcycleshop-register-page/motorcycleshop-register-page.component";
import {AuthGuard} from "./auth/services/auth.guard";
import {MotorcycleshopHomePageComponent} from "./motorcycleshop-home/pages/motorcycleshop-home-page/motorcycleshop-home-page.component";
import {OrderSummaryComponent} from "./motorcycleshop-order/components/order-summary/order-summary.component";
import {OrderGuard} from "./auth/services/order.guard";

export const enum RoutesConfig {
  homePage= 'motorcycleshop-home',
  registerPage = 'motorcycleshop-register',
  loginPage = 'motorcycleshop-login',
  productsPage = 'motorcycleshop-products',
  basketPage = 'motorcycleshop-basket',
  orderForm = 'motorcycleshop-order'
}

const routes: Routes = [
  {
    path: RoutesConfig.homePage,
    component: MotorcycleshopHomePageComponent,
  },
  {
    path: RoutesConfig.loginPage,
    component: MotorcycleshopLoginPageComponent,
  },
  {
    path: RoutesConfig.productsPage,
    component: MotorcycleshopProductsPageComponent
  },
  {
    path: RoutesConfig.registerPage,
    component: MotorcycleshopRegisterPageComponent
  },

  {
    path: RoutesConfig.orderForm,
    component: OrderSummaryComponent,
    canActivate: [OrderGuard]
  },

  {
    path: RoutesConfig.basketPage,
    component: MotorcycleshopBasketPageComponent,
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: RoutesConfig.homePage, pathMatch: 'full'},
  { path: '**', redirectTo: RoutesConfig.homePage }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
