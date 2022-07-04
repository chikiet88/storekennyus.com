import { LabelType, Options } from "@angular-slider/ngx-slider";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { Subject, take, takeUntil } from "rxjs";
import { ThuonghieuService } from "../../thuonghieu/thuonghieu.service";
import { ProductListService } from "../product-list.service";

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: "app-sanpham-danhmuc",
  templateUrl: "./sanpham-danhmuc.component.html",
  styleUrls: ["./sanpham-danhmuc.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class SanphamDanhmucComponent implements OnInit {
  selectedSendingFeatures;
  products: any[];
  iCheckbox = [];
  tempProductSplice: any[] = [];
  productDM: any[];
  danhmuc: any[];
  valuePrice: number;
  selectedIndex: number;
  productListhide: number;
  minValue: number = 0;
  temp: any[];
  maxValue: number = 5000000;
  isChecked = false;
  indexPaginate: number = 0;
  arrCheckboxThuonghieu = [];
  filterThuonghieu = [];
  tempAllProducts: any[] = [];
  tempDM: any[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private _transformer = (node: any, level: number) => {
    return {
        expandable: !!node.children && node.children.length > 0,
        name: node.Tieude || node.title,
        level: level,
        item: node,
    };
};

treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
);

treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
);

dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
);

  options: Options = {
    floor: 0,
    ceil: 500000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b>" + value + "đ";
        case LabelType.High:
          return "<b>Max price:</b>" + value + "đ";
        default:
          this.valuePrice = value;

          return  value + "đ";
      }
    },
  };
  thuonghieus: string[] = [];
  changePrice(value) {
    this._productService.products$.pipe(take(1)).subscribe((res) => {
      
      let arr = res.filter((x) => x.Gia <= value);
      if (arr.length > 0) {
        this.splceArr(arr);
      }
    });
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
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  onSelectDanhmuc(item, i) {
    console.log(item);

    this.tempProductSplice = [];
    this.selectedIndex = i;
    let a = [];
    this.tempDM.filter((x) => {
      if (x.pid == item.id) {
        a.push(x);
      }
    });
    if (a.length > 1) {
      a = [...a, item];
    } else {
      a = [item];
    }

    let b = [];

    this._productService.products$.subscribe((res) => {
      res.filter((x) => {
        a.forEach((v) => {
          if (x.idDM == v.id) {
            b.push(x);
          }
        });
      });
    });
    this.splceArr(b);
  }

  paginateNumber(i) {
    this.indexPaginate = i;
    console.log(i);

    this.productDM = this.tempProductSplice[i];
  }
  selectSale() {
    this.isChecked = !this.isChecked;

    if (this.isChecked == true) {
      this.productDM = this.productDM.filter((x) => x.Trangthai == "1");
    } else {
      this.productDM = this.temp;
    }
  }
  checkboxThuonghieu(item, i) {
    this._productService.products$.pipe(take(1)).subscribe((res) => {
      
      let arr = res.filter((x) => x.Thuonghieu == item.id);
      if (arr.length > 0) {
        this.splceArr(arr);
      }
    });
  }

  sapxepgiatri(value){
    if (value == "low") {
      let arr
      this._productService.products$.subscribe((res) =>
      arr =   res.sort((a, b) => {
          return a.Gia - b.Gia;
        })
      );
      console.log(arr);
      
      this.splceArr(arr)
    }
  }

  splceArr(arr) {
    this.tempProductSplice = [];
    let x = arr.length / 12;
    if (arr.length > 0) {
      for (let i = 0; i < x; i++) {
        this.tempProductSplice.push(arr.splice(0, 12));
        console.log(this.tempProductSplice);
      }
    }
    this.productDM = this.tempProductSplice[0];
  }
  nest = (items, id = "", link = "pid") =>
    items
      ?.filter((item) => item[link] == id)
      .map((item) => ({
        ...item,
        children: this.nest(items, item.id),
      }));

  ngOnInit(): void {
    this._productService.getDanhmuc().pipe(take(1)).subscribe();
    this._productService.danhmuc$.subscribe((res) => {
      this.tempDM = res;
      this.danhmuc = this.nest(res);
      this.dataSource.data = this.danhmuc 
    });
    this._productService.getProduct().subscribe();
    this._productService.products$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.products = res;

        let arr = res;
        let x = arr?.length / 12;

        if (arr.length > 0) {
          for (let i = 0; i < x; i++) {
            this.tempProductSplice.push(arr.splice(0, 12));
          }
        }
      }
      this.productDM = this.tempProductSplice[0];
      this.temp = this.productDM;
    });
    this._thuonghieuService.getThuonghieu().subscribe();
    this._thuonghieuService.thuonghieus$.subscribe(
      (res) => (this.thuonghieus = res)
    );
  }
}
