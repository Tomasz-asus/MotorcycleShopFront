import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MotorcycleshopBasketPageComponent } from './motorcycleshop-basket/pages/motorcycleshop-basket-page/motorcycleshop-basket-page.component';


@NgModule({
  declarations: [
    AppComponent,

    MotorcycleshopBasketPageComponent,


  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
