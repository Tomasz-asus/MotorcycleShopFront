import {Component, Input} from '@angular/core';
import {Product} from '../../../api/model/product';
import {Observable} from 'rxjs';
import {MotorcycleshopService} from '../../../api/service/motorcycleshop.service';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {Router} from '@angular/router';
import {RoutesConfig} from '../../../app-routing.module';

@Component({
  selector: 'app-motorcycleshop-navbar',
  templateUrl: './motorcycleshop-navbar.component.html',
  styleUrls: ['./motorcycleshop-navbar.component.css']
})

export class MotorcycleshopNavbarComponent {

  public counter: Observable<number> | undefined;
  public products: Observable<Product[]> | undefined;

  @Input() routes: { label: string, route: string }[] = [];


  constructor(public service: MotorcycleshopService, public tokenStorage: TokenStorageService,
              private router: Router) {
  }

  viewCard() {
    this.router.navigateByUrl(RoutesConfig.basketPage);
  }

  onItemDelete(product: Product) {
    this.service.removeFromBasket(product);
  }

  ngOnInit(): void {
    this.products = this.service.basketProducts;
    this.counter = this.service.counter;
  }


}
