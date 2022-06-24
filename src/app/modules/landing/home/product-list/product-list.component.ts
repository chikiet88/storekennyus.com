import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { ProductListService } from "./product-list.service";
import { ThuonghieuService } from "../thuonghieu/thuonghieu.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit {
  products: any[];
  productDM: any[];
  danhmuc: any[];
  valuePrice: number;
  selectedIndex: number;
  productListhide: number;
  minValue: number = 0;
  temp: any[];
  maxValue: number = 100;
  isChecked = false;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          this.valuePrice = value;

          return "$" + value;
      }
    },
  };
  thuonghieus: string[] = [];
  changePrice(value) {
    console.log(value);

    this.productDM = this.productDM.filter((x) => x.price <= value);
    console.log(this.productDM);
  }
  productListtoggle(number) {
    this.productListhide = number;
  }
  constructor(
    private _productService: ProductListService,
    private _thuonghieuService: ThuonghieuService
  ) {
    this.productListhide = 1;
  }
  onSelectDanhmuc(item, i) {
    this._productService.products$.subscribe((res) => (this.products = res));

    this.selectedIndex = i;
    this.productDM = this.products.filter((x) => {
      return x.idDM == item.id;
    });
    this.temp = this.productDM;
  }
  selectThuonghieu(value){
    console.log(value);
    
  let temp = this.thuonghieus
  temp.filter(x=>{

  })
  }
  selectSale() {
    this.isChecked = !this.isChecked;

    if (this.isChecked == true) {
      this.productDM = this.productDM.filter((x) => x.Trangthai == "sale");
    } else {
      this.productDM = this.temp;
    }
  }
  nest = (items, id = "", link = "pid") =>
    items
      ?.filter((item) => item[link] == id)
      .map((item) => ({
        ...item,
        children: this.nest(items, item.id),
      }));
  ngOnInit(): void {
    this._productService.getDanhmuc().subscribe();
    this._productService.danhmuc$.subscribe((res) => {
      this.danhmuc = this.nest(res);
    });
    this._productService.getProduct().subscribe();
    this._productService.products$.subscribe((res) => {
      this.productDM = res?.filter((x) => x.idDM == this.danhmuc[0].id);
    });
    this._thuonghieuService.getThuonghieu().subscribe();
    this._thuonghieuService.thuonghieus$.subscribe(
      (res) => (this.thuonghieus = res)
    );
  }
}
