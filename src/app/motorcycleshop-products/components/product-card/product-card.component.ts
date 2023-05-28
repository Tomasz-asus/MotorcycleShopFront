import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../api/model/product";
import {TokenStorageService} from "../../../auth/services/token-storage.service";
import {Router} from "@angular/router";
import {RoutesConfig} from "../../../app-routing.module";
import {MotorcycleshopService} from "../../../api/service/motorcycleshop.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {


  @Input() product: Product| undefined;
  @Output() onDoneClick = new EventEmitter<Product>();

  isProductInBasket$: Observable<boolean> | undefined;

  constructor(public tokenStorage: TokenStorageService, private route: Router,
              private service: MotorcycleshopService) { }

  ngOnInit(): void {
    this.isProductInBasket$ = this.service.isProductInBasket(this.product);
  }

  doneClick = () => {
    this.onDoneClick.emit(this.product);
  };

  toLogWindowClick() {
    this.route.navigateByUrl(RoutesConfig.loginPage);
  }
}
