import { Component, OnInit } from "@angular/core";
import { CartPopupService } from "../components/cart-popup/cart-popup.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  carts: any[];
  cart;
  amount: number;
  num: number;
  cartNum: Number;
  constructor(private _cartService: CartPopupService) {}
  changeQuantity(item, e) {
    this.cartNum = Number(e.target.value)
    console.log();
    
    if (this.cartNum != undefined) {
      this.carts.find((x) => {
        if (x.id == item.id) {
          x.num = this.cartNum;
        }
      });
    }
  }
  removeItem(item){
    this._cartService.removeCart(item).subscribe()
  }
  updateCart() {
      this.carts.forEach(x=>{
        
        let numTemp 
        if(x.num){
          numTemp = x.num
          delete x.num
          this._cartService.pushQuantityCart(x, numTemp).subscribe(res => alert('Cập nhật giỏ hàng thành công'))
        }
      })
  }
  ngOnInit(): void {
    this._cartService.getCart().subscribe();
    this._cartService.carts$.subscribe((res) => (this.carts = res));
    this._cartService.amount$.subscribe((res) => (this.amount = res));
    this._cartService.num$.subscribe((res) => (this.num = res));
  }
}
