import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ThuonghieuService } from '../thuonghieu/thuonghieu.service';
import { SanphamService } from './sanpham.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss']
})
export class SanphamComponent implements OnInit {

  products: any[];
  tempProductSplice: any[] = [];
  productDM: any[];
  danhmuc: any[];
  valuePrice: number;
  selectedIndex: number;
  productListhide: number;
  minValue: number = 0;
  temp: any[];
  maxValue: number = 100;
  isChecked = false;
  indexPaginate: number = 0;
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
    private _productService: SanphamService,
    private _thuonghieuService: ThuonghieuService
  ) {
    this.productListhide = 1;
  }
  onSelectDanhmuc(item, i) {
    this.tempProductSplice = [];


    this.selectedIndex = i;
    // this.products = this.products.filter((x) => {
    //   return x.idDM == item.id;
    // });
    this._productService.getProduct().subscribe()
    this._productService.products$.subscribe((res) => {
      res = res.filter((x) => (x.idDM = item.id));
      console.log(res);

      let x = res.length / 10;
      if (res.length > 0) {
        for (let i = 0; i < x; i++) {
          this.tempProductSplice.push(res.splice(10 * i, 10 * i + 10));
        }
      }
      this.productDM = this.tempProductSplice[0];
    });
  
    console.log(this.tempProductSplice);
    this.productDM = this.tempProductSplice[0];
    this.temp = this.productDM;
  }
  selectThuonghieu(value) {
    console.log(value);

    let temp = this.thuonghieus;
    temp.filter((x) => {});
  }
  paginateNumber(i) {
    console.log(i);
    this.indexPaginate = i;
    this.productDM = this.tempProductSplice[i];
    console.log(this.productDM);
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
      
      let arr = res
      let x = arr.length / 10;
      if (arr.length > 0) {
        for (let i = 0; i < x; i++) {
          this.tempProductSplice.push(arr.splice(10 * i, 10 * i + 10));
        }
      }
      this.productDM = this.tempProductSplice[0];
    });
    this._thuonghieuService.getThuonghieu().subscribe();
    this._thuonghieuService.thuonghieus$.subscribe(
      (res) => (this.thuonghieus = res)
    );
  }

}
