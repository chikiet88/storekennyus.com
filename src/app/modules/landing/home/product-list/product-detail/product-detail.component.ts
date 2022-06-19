import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartPopupService } from "../../components/cart-popup/cart-popup.service";
import { DanhmucService } from "../../danhmuc/danhmuc.service";
import { ProductListService } from "../product-list.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
// export class ProductDetailComponent implements OnInit, AfterViewInit {
export class ProductDetailComponent implements OnInit {
  rating3;
  quantity: number = 1;
  product;
  products;
  danhmuc: any[];
  constructor(
    private _productService: ProductListService,
    private route: ActivatedRoute,
    private _cartService: CartPopupService,
    private _danhmucService: DanhmucService
  ) {}

  ngOnInit(): void {
    this.rating3 = 3;
    const prodId = this.route.snapshot.paramMap.get("id");
    this._productService.getDanhmuc().subscribe();
    this._productService.danhmuc$.subscribe((res) => (this.danhmuc = res));
    this._danhmucService.getDanhmuc().subscribe();

    this._productService.getProductDetail(prodId).subscribe((res) => {
      this.product = res;

      this._productService.getProduct().subscribe();
      this._productService.products$.subscribe((res) => {
        this.products = res?.filter(
          (x) => x.idDM == this.product.idDM && x.id != this.product.id
        );
      });

      this._danhmucService.danhmucs$.subscribe((res) => {
        console.log(res);
  
        res?.find((x) => {
          console.log(this.product);
  
          if (this.product?.idDM == x.id) {
            console.log(this.product);
  
            this.product.tenDM = x.Tieude;
            console.log(x.Tieude);
          }
        });
      });
      this._cartService.getCart().subscribe(res=> {
        res.find(x=>{
          if(this.product.id == x.id){
            this.quantity = x.cartNum
          }
        })
      })
    });
    
   
  }
  // currentDate: any;
  // targetDate: any;
  // cDateMillisecs: any;
  // tDateMillisecs: any;
  // difference: any;
  // seconds: any;
  // minutes: any;
  // hours: any;
  // days: any;
  // year: number = 2023;
  // month: number = 6;
  // months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "Aug",
  //   "Sept",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // day: number = 31;

  // ngAfterViewInit() {
  //   this.myTimer();
  // }

  // myTimer() {
  //   this.currentDate = new Date();
  //   this.targetDate = new Date(2023, 6, 31);
  //   this.cDateMillisecs = this.currentDate.getTime();
  //   this.tDateMillisecs = this.targetDate.getTime();
  //   this.difference = this.tDateMillisecs - this.cDateMillisecs;
  //   this.seconds = Math.floor(this.difference / 1000);
  //   this.minutes = Math.floor(this.seconds / 60);
  //   this.hours = Math.floor(this.minutes / 60);
  //   this.days = Math.floor(this.hours / 24);

  //   this.hours %= 24;
  //   this.minutes %= 60;
  //   this.seconds %= 60;
  //   this.hours = this.hours < 10 ? "0" + this.hours : this.hours;
  //   this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
  //   this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

  //   document.getElementById("days").innerText = this.days;
  //   document.getElementById("hours").innerText = this.hours;
  //   document.getElementById("mins").innerText = this.minutes;
  //   document.getElementById("seconds").innerText = this.seconds;

  //   setInterval(this.myTimer, 1000);
  // }
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
