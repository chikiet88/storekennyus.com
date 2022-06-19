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
  addtocart(item) {
    if (item.GiaSale != 0) {
      item.Gia = item.GiaSale;
      console.log(item.Gia);
    } else {
      this._cartService

        .pushCart(item)
        .subscribe((res) => alert("Thêm sản phẩm thành công"));
    }
  }
}
