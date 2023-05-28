import {Component, OnInit} from '@angular/core';
import {Product} from "../../../api/model/product";
import {MotorcycleshopService} from "../../../api/service/motorcycleshop.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {RoutesConfig} from "../../../app-routing.module";


@Component({
  selector: 'app-basket-product-list',
  templateUrl: './basket-product-list.component.html',
  styleUrls: ['./basket-product-list.component.css']
})
export class BasketProductListComponent implements OnInit{

  public products: Observable<Product[]> | undefined;

  constructor(public motorcycleshopService: MotorcycleshopService, private router: Router) {}

  ngOnInit() {
    this.products = this.motorcycleshopService.basketProducts;
  }

  onItemDelete = (product: Product) => {
    this.motorcycleshopService.removeFromBasket(product);
  }
  //
  // details(product: Product) {
  // }

  onSubmit() {
    this.router.navigateByUrl(RoutesConfig.orderForm);
  }
}
