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
  // @Input() item;
  item =  {
    "name": "Crest 3D White Advanced Triple Whitening Toothpaste, 5-pack",
    "des": "<p>abccc</p>",
    "thuonghieu":"Crest",
    "status": "Promo",
    "idDM": "4",
    "code":"CSCN",
    "khoiluong": "",
    "slug": "abc",
    "SKU": "CSCN0400",
    "tags": "",
    "price": 475000,
    "oldprice": "",
    "image": {
      "1": {
        "key": "-N307OJNFB7bdGTPMoo7",
        "name": "product42.jpg",
        "url": "https://firebasestorage.googleapis.com/v0/b/timona-9c284.appspot.com/o/test%2Fproduct42.jpg?alt=media&token=0d5edf09-6744-4944-a9e9-199f97725a8b"
      },
      "2": {
        "key": "-N307R5USpklPQwNtdnl",
        "name": "brian-hughes.jpg",
        "url": "https://firebasestorage.googleapis.com/v0/b/timona-9c284.appspot.com/o/test%2Fbrian-hughes.jpg?alt=media&token=adb67e4d-2a6f-4f15-a34b-0cf22147749e"
      }
    },
    "Type": "Featured",
    "infor": "",
    "id": 1,
    "mota": "<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; you a complete account of the system, and expound the actual</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; teachings of the great explorer of the truth, the master-builder</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; of human happiness. No one rejects, dislikes, or avoids pleasure</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; itself, because it is pleasure, but because those who do not</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; know how to pursue pleasure rationally encounter consequences</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; that are extremely painful.</p><p><br>&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; To take a trivial example, which of us ever undertakes laborious</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; physical exercise, except to obtain some advantage from it? But</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; who has any right to find fault with a man who chooses to enjoy</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a pleasure that has no annoying consequences, or one who avoids</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a pain that produces no resultant pleasure? On the other hand,</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; we denounce with righteous indignation and dislike men who are</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; so beguiled and demoralized by the charms of pleasure of the</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; moment, so blinded by desire.</p>",
    "thanhphan": ""
  }
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
    this._cartService.pushCart(item).subscribe(res=> alert('Thêm sản phẩm thành công'));
  }
}
