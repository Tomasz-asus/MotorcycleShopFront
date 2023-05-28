import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class MotorcycleshopOrderModule { }
