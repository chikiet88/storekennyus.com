import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";

@Component({
  selector: "app-danhsach-sanpham",
  templateUrl: "./danhsach-sanpham.component.html",
  styleUrls: ["./danhsach-sanpham.component.scss"],
})
export class DanhsachSanphamComponent implements OnInit {
  @Input() productDM;
  @Input() tempProductSplice;
  temp: any[];
  tempAllProducts: any[] = [];

  productListhide = 1;
  indexPaginate: number = 0;
  _productService
  isChecked = false;
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.productDM);
    console.log(this.tempProductSplice);
    
    
  }
  productListtoggle(number) {
    this.productListhide = number;
  }

  selectSale() {
    this.isChecked = !this.isChecked;

    if (this.isChecked == true) {
      this.productDM = this.productDM.filter((x) => x.Trangthai == "1");
    } else {
      this.productDM = this.temp;
    }
  }
  paginateNumber(i) {
    console.log(i);
    this.indexPaginate = i;
    this.productDM = this.tempProductSplice[i];
    console.log(this.productDM);
  }
}
