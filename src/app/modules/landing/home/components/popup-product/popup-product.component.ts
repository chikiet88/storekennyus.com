import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { threadId } from "worker_threads";
import { DanhmucService } from "../../danhmuc/danhmuc.service";
import { CartPopupService } from "../cart-popup/cart-popup.service";

@Component({
  selector: "app-popup-product",
  templateUrl: "./popup-product.component.html",
  styleUrls: ["./popup-product.component.scss"],
})
export class PopupProductComponent implements OnInit {
  rating3;
  quantity: number = 1;
  carts:any[];
  danhmuc: any[];
  constructor(
    private _cartService: CartPopupService,
    private _danhmucService: DanhmucService,
    public dialogRef: MatDialogRef<PopupProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.rating3 = 3;
    this._danhmucService.getDanhmuc().subscribe();
    this._danhmucService.danhmucs$.subscribe((res) => {
      res?.find((x) => {
        if (x.id == this.data.dulieu.idDM) {
          this.data.dulieu.categories = x.Tieude;
          console.log(x.Tieude);
          
        }
      });
    });
    this._cartService.getCart().subscribe(res=> {
      res.find(x=>{
        if(this.data.dulieu.id == x.id){
          this.quantity = x.cartNum
        }
      })
    })
    
  }

  addtocart(item) {
    if (item.GiaSale != 0) {
      item.Gia = item.GiaSale;
      this._cartService
        .pushQuantityCart(item, this.quantity)
        .subscribe((res) => {
          alert("thêm sản phẩm thành công");
        });
    } else {
      alert("thêm sản phẩm thành công");
      this._cartService
        .pushQuantityCart(item, this.quantity)
        .subscribe((res) => alert("thêm sản phẩm thành công"));
    }
  }
  congsoluong() {
    this.quantity += 1;
  }
  trusoluong() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }
  getQuantity(e) {
    console.log(e);
  }
}
