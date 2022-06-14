import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartPopupService } from "../../components/cart-popup/cart-popup.service";
import { ProductListService } from "../product-list.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  rating3;
  quantity: number = 1;
  product
  // product = {
  //   "name": "Crest 3D White Advanced Triple Whitening Toothpaste, 5-pack",
  //   "des": "<p>abccc</p>",
  //   "thuonghieu":"Crest",
  //   "status": "Promo",
  //   "idDM": "4",
  //   "code":"CSCN",
  //   "khoiluong": "",
  //   "slug": "abc",
  //   "SKU": "CSCN0400",
  //   "tag": "",
  //   "price": 475000,
  //   "oldprice": "",
  //   "image": {
  //     "1": {
  //       "key": "-N307OJNFB7bdGTPMoo7",
  //       "name": "product42.jpg",
  //       "url": "https://firebasestorage.googleapis.com/v0/b/timona-9c284.appspot.com/o/test%2Fproduct42.jpg?alt=media&token=0d5edf09-6744-4944-a9e9-199f97725a8b"
  //     },
  //     "2": {
  //       "key": "-N307R5USpklPQwNtdnl",
  //       "name": "brian-hughes.jpg",
  //       "url": "https://firebasestorage.googleapis.com/v0/b/timona-9c284.appspot.com/o/test%2Fbrian-hughes.jpg?alt=media&token=adb67e4d-2a6f-4f15-a34b-0cf22147749e"
  //     }
  //   },
  //   "Type": "Featured",
  //   "infor": "",
  //   "id": 1,
  //   "tenDM":"Chăm Sóc Cá Nhân",
  //   "mota": "<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; you a complete account of the system, and expound the actual</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; teachings of the great explorer of the truth, the master-builder</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; of human happiness. No one rejects, dislikes, or avoids pleasure</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; itself, because it is pleasure, but because those who do not</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; know how to pursue pleasure rationally encounter consequences</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; that are extremely painful.</p><p><br>&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; To take a trivial example, which of us ever undertakes laborious</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; physical exercise, except to obtain some advantage from it? But</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; who has any right to find fault with a man who chooses to enjoy</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a pleasure that has no annoying consequences, or one who avoids</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a pain that produces no resultant pleasure? On the other hand,</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; we denounce with righteous indignation and dislike men who are</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; so beguiled and demoralized by the charms of pleasure of the</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; moment, so blinded by desire.</p>",
  //   "thanhphan": ""
  // };
  products;
  danhmuc: any[];
  constructor(
    private _productService: ProductListService,
    private route: ActivatedRoute,
    private _cartService: CartPopupService
  ) {}

  ngOnInit(): void {
    this.rating3 = 3;
    const prodId = this.route.snapshot.paramMap.get("id");

    this._productService.getDanhmuc().subscribe();
    this._productService.danhmuc$.subscribe((res) => (this.danhmuc = res));
    this._productService.getProductDetail(prodId).subscribe((res) => {
      this.product = res;
      this.danhmuc.find((x) => {
        if (x.id == this.product.idDM) {
          return (this.product.tenDM = x.Tieude);
        }
      });
      this._productService.getProduct().subscribe();
      this._productService.products$.subscribe((res) => {
        this.products = res?.filter(
          (x) => x.idDM == this.product.idDM && x.id != this.product.id
        );
      });
    });
  }
  currentDate: any;
  targetDate: any;
  cDateMillisecs: any;
  tDateMillisecs: any;
  difference: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  year: number = 2023;
  month: number = 6;
  months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  day: number = 31;

  ngAfterViewInit() {
    this.myTimer();
  }

  myTimer() {
    this.currentDate = new Date();
    this.targetDate = new Date(2023, 6, 31);
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? "0" + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

    document.getElementById("days").innerText = this.days;
    document.getElementById("hours").innerText = this.hours;
    document.getElementById("mins").innerText = this.minutes;
    document.getElementById("seconds").innerText = this.seconds;

    setInterval(this.myTimer, 1000);
  }
  addtocart(item) {
    console.log(this.quantity);
    this._cartService.pushQuantityCart(item, this.quantity).subscribe();
  }
  congsoluong() {
    this.quantity += 1;
  }
  trusoluong(){
    if(this.quantity > 1){
      this.quantity -= 1;
    }
  }
  getQuantity(e) {
    console.log(e);
  }
}
