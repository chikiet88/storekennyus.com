import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CartPopupService } from "../components/cart-popup/cart-popup.service";
import { PopupProductComponent } from "../components/popup-product/popup-product.component";

@Component({
  selector: "app-product-popular",
  templateUrl: "./product-popular.component.html",
  styleUrls: ["./product-popular.component.scss"],
})
export class ProductPopularComponent implements OnInit {
  @Input() item;
  constructor(
    public dialog: MatDialog,
    private _cartService: CartPopupService
  ) {}
  openDialog() {
    const dialogRef = this.dialog.open(PopupProductComponent, {
      data: { dulieu: this.item },
    });
  }
  ngOnInit(): void {}
  pushLocal() {
    let a = JSON.parse(localStorage.getItem("sanphamdaxem")) || [];
    a.filter((x) => {
      if (x?.id == this.item.id) {
        console.log(x);
      } else {
        a.push(this.item);  
        localStorage.setItem("sanphamdaxem", JSON.stringify(a));
      }
    });
  }
  addtocart(item) {
    console.log(item);
    if (item.GiaSale != 0) {
      item.Gia = item.GiaSale;
    }
    this._cartService
      .pushCart(item)
      .subscribe((res) => alert("Thêm sản phẩm thành công"));
  }
}
