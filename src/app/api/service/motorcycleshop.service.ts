import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleshopService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  private _productsBase = new BehaviorSubject<Product[]>([]);
  private _products = new BehaviorSubject<Product[]>([]);
  readonly products = this._products.asObservable();

  private _basketProducts = new BehaviorSubject<Product[]>([]);
  readonly basketProducts = this._basketProducts.asObservable();

  private _counter = new BehaviorSubject<number>(0);
  readonly counter = this._counter.asObservable();

  private _searchProductName = new BehaviorSubject<string>('');
  readonly searchProduct = this._searchProductName.asObservable();

  increaseCounter = (): void => {
    this._counter.next(this._counter.value + 1);
  }
  decreaseCounter = (): void => {
    this._counter.next(this._counter.value - 1);
  }
  getProducts = (): Observable<Product[]> => {
    return this.http.get<Product[]>(`${environment.motorcycleEndpointUrl}products`)
      .pipe(tap(results => {
        this._products.next(results);
        this._productsBase.next(results);
      }));
  }
  getProductsFromBasket = (): Observable<Product[]> => {
    return this.http.get<Product[]>(`${environment.motorcycleEndpointUrl}products/fromBasket/${this.tokenStorage.getBasketName()}`)
      .pipe(tap(results => {
        this._basketProducts.next(results);
        this._counter.next(results.length);
      }));
  }
  addProductToBasket = (product: Product) => {

    return this.http.post(`${environment.motorcycleEndpointUrl}product/toBasket/${this.tokenStorage.getBasketName()}/${product.productName}`, null)
      .subscribe(() => {
        this.increaseCounter();
        this._basketProducts.next([...this._basketProducts.value, product]);
      });
  }
  removeFromBasket = (product: Product) => {

    this.http.delete(`${environment.motorcycleEndpointUrl}product/fromBasket/${this.tokenStorage.getBasketName()}/${product.productName}`)
      .subscribe(() => {
        this.decreaseCounter();
        this._basketProducts.next(this._basketProducts.value.filter(p => p.productName !== product.productName));
      });
  }
  clearProductsAndCounter() {
    this._basketProducts.next([]);
    this._counter.next(0);
  }
  isBasketEmpty(): boolean {
    return this._basketProducts.value.length === 0;
  }
  isProductInBasket = (product: Product | undefined): Observable<boolean> => this.basketProducts.pipe(
    map(list => product !== undefined ? !!list.find(p => p.productName == product.productName) : false)
  )
  searchProducts(): void {
    if (this._searchProductName.value === '') {
      this._products.next(this._productsBase.value);
    } else {
      this._products.next(this._productsBase.value.filter((product) => {
        return product.productName.toLowerCase().includes(this._searchProductName.value.toLowerCase());
      }))
    }
  }
  resetProductsSearch = () => {
    this._products.next(this._productsBase.value);
  }
  updateSearchInput = (search: string | null) => this._searchProductName.next(<string>search);
  makeOrder = (order: Order) => {
    return this.http.post(`${environment.motorcycleEndpointUrl}order`, order);
  }
}

