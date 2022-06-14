import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductListService {
  private urlApi = "http://localhost:3000";
  private _products: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _product: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject(null);
  get products$(): Observable<any[]> {
    return this._products.asObservable();
  }
  get product$(): Observable<any> {
    return this._product.asObservable();
  }
  get danhmuc$(): Observable<any> {
    return this._danhmuc.asObservable();
  }
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get(this.urlApi + `/product`).pipe(
      map((products) => {
        this._products.next(products);
        return products;
      })
    );
  }
  getProductDetail(id) {
    return this.http.get(this.urlApi + `/product/${id}`).pipe(
      map((product) => {
        this._product.next(product);
        return product;
      })
    );
  }
  getDanhmuc() {
    return this.http.get(this.urlApi + `/danhmuc`).pipe(
      map((danhmuc) => {
        this._danhmuc.next(danhmuc);
        return danhmuc;
      })
    );
  }
}