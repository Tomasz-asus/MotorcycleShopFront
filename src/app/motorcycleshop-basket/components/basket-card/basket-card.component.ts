import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../api/model/product';

@Component({
  selector: 'app-basket-card',
  templateUrl: './basket-card.component.html',
  styleUrls: ['./basket-card.component.css']
})
export class BasketCardComponent {

  @Input() product: Product|undefined;
  @Output() onDoneClick = new EventEmitter<Product>();

  doneClick = () => {
    this.onDoneClick.emit(this.product);
  }
}
