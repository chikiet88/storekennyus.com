import { Component, Input, OnInit } from "@angular/core";
import { CartPopupService } from "./cart-popup.service";

@Component({
  selector: "app-cart-popup",
  templateUrl: "./cart-popup.component.html",
  styleUrls: ["./cart-popup.component.scss"],
})
export class CartPopupComponent implements OnInit {
  @Input() isShowCart;
  product;
  num:number = 0;
  amount:number = 0;
  carts: any[] = [];
  constructor(private _cartService: CartPopupService) {}
  removeItem(item){
    this._cartService.removeCart(item).subscribe()
  }
  ngOnInit(): void {
    this._cartService.getCart().subscribe();
    this._cartService.carts$.subscribe((res) => {
      this.carts = res;
    });
    this._cartService.num$.subscribe((res) => {
      this.num = res;
    });
    this._cartService.amount$.subscribe((res) => {
      this.amount = res;
    });
  }
}
