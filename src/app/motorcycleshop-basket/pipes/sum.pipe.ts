import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../../api/model/product";

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(value: Product[] | null): number {

    let temp = value?.reduce(function (acc, obj) {
      return acc + obj.productPrice;
    }, 0);
    return temp ? Number((Math.round(temp * 100) / 100).toFixed(2)) : 0;
  }
}
