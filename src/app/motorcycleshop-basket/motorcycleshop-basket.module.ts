import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketCardComponent } from './components/basket-card/basket-card.component';
import { BasketProductListComponent } from './components/basket-product-list/basket-product-list.component';
import { SumPipe } from './pipes/sum.pipe';
import {MotorcycleshopBasketPageComponent} from "./pages/motorcycleshop-basket-page/motorcycleshop-basket-page.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MotorcycleshopBasketPageComponent,
    BasketCardComponent,
    BasketProductListComponent,
    SumPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    MotorcycleshopBasketPageComponent
  ]

})
export class MotorcycleshopBasketModule { }
