import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import { MotorcycleshopProductsPageComponent } from './pages/motorcycleshop-products-page/motorcycleshop-products-page.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsListComponent,
    MotorcycleshopProductsPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MotorcycleshopProductsPageComponent]
})
export class MotorcycleshopProductsModule { }
