import { Injectable } from "@angular/core";
import { items } from "app/mock-api/apps/file-manager/data";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartPopupService {
  product;
  arr = JSON.parse(localStorage.getItem("carts")) || [];
  num = JSON.parse(localStorage.getItem("num")) || 0;
  amount = JSON.parse(localStorage.getItem("amount")) || 0;

  private _carts: BehaviorSubject<any | []> = new BehaviorSubject(null);
  private _num: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _amount: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get carts$(): Observable<any> {
    return this._carts.asObservable();
  }
  get num$(): Observable<number> {
    return this._num.asObservable();
  }
  get amount$(): Observable<number> {
    return this._amount.asObservable();
  }

  pushCart(item): Observable<any> {
    let cartNum = 1;
    this.amount += item.Gia * cartNum;
    this.num += cartNum;
    let index = this.arr.findIndex((e) => e.id == item.id);
    if (index === -1) {
      item.cartNum = cartNum;
      // item.cart = this.amount;
      this.arr.push(item);
      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
    } else {
      this.arr[index].cartNum += 1;
      // this.arr[index].cart += this.amount;

      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
    }

    localStorage.setItem("carts", JSON.stringify(this.arr));
    localStorage.setItem("num", JSON.stringify(this.num));
    localStorage.setItem("amount", JSON.stringify(this.amount));
    return of(item);
  }

  pushQuantityCart(item, quantity) {
    let index = this.arr.findIndex((e) => e.id === item.id);
    if (index === -1) {
      console.log(index);
      item.cartNum = quantity
      console.log(item.cartNum);
      
      this.amount += item.Gia * quantity;
      this.num += quantity;
      this.arr.push(item);
      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
      localStorage.setItem("carts", JSON.stringify(this.arr));
      localStorage.setItem("num", JSON.stringify(this.num));
      localStorage.setItem("amount", JSON.stringify(this.amount));
    } else {
     
      console.log(index);
      console.log(this.arr[index]);
      
      this.num -= this.arr[index].cartNum;
      this.amount -= this.arr[index].Gia * this.arr[index].cartNum;

      console.log(this.amount);
      console.log(this.num);
      console.log(this.arr);
      
      this.arr[index].cartNum = quantity;
      this.num += quantity;
      this.amount += item.Gia * quantity;
      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
      localStorage.setItem("carts", JSON.stringify(this.arr));
      localStorage.setItem("num", JSON.stringify(this.num));
      localStorage.setItem("amount", JSON.stringify(this.amount));
    }

    return of(item);
  }
  getCart(): Observable<any> {
    this._carts.next(this.arr);
    this._num.next(this.num);
    this._amount.next(this.amount);

    return of(this.arr);
  }
  removeCart(item) {
    let index = this.arr.findIndex((x) => x.id == item.id);
    let temp = this.arr[index].cartNum;
    this.num -= temp;
    this.arr[index].cartNum -= this.arr[index].cartNum;
    this.amount -= this.arr[index].Gia * temp;
    if (this.arr[index].cartNum === 0) {
      this.arr = this.arr.filter((x) => x.id != item.id);
      console.log(this.arr);

      this._carts.next(this.arr);
      localStorage.setItem("carts", JSON.stringify(this.arr));
    }
    this._num.next(this.num);
    this._amount.next(this.amount);
    localStorage.setItem("num", JSON.stringify(this.num));
    localStorage.setItem("amount", JSON.stringify(this.amount));
    return of(this.arr);
  }
  constructor() {}
}
