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
  contentImage =false
  constructor(
    public dialog: MatDialog,
    private _cartService: CartPopupService
  ) {}
  openDialog() {
    const dialogRef = this.dialog.open(PopupProductComponent, {
      data: { dulieu: this.item },
    });
  }
  ngOnInit(): void {
    if(this.item.ContentImage.contentImage1 != ""){
      this.contentImage = true
    }
    if(Object.keys(this.item.ContentImage).length == 0){
      this.contentImage = false
    }
   
  }

  addtocart(item) {
  
    this._cartService.pushCart(item).subscribe((res) => {
      alert("Thêm sản phẩm thành công");
    });
   

  }
}
