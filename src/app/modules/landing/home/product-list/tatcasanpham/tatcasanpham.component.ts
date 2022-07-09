import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take } from 'rxjs';
import { ProductListService } from '../product-list.service';

@Component({
    selector: 'app-tatcasanpham',
    templateUrl: './tatcasanpham.component.html',
    styleUrls: ['./tatcasanpham.component.scss'],
})
export class TatcasanphamComponent implements OnInit, DoCheck {
    danhmucdetail;
    temp: any[];
    valuePrice;
    idThuonghieu = JSON.parse(localStorage.getItem('thuonghieu')) || '';

    tempAllProducts: any[] = [];
    products;
    productListhide = 1;
    indexPaginate: number = 0;
    tempProductSplice = [];
    productDM: any[];
    isChecked = false;
    productPriceFilter;
    thuonghieuFilter;
    constructor(
        private route: ActivatedRoute,
        private _productService: ProductListService
    ) {}

    public ngDoCheck() {
        this._productService.priceChange$.subscribe(
            (res) => (this.productPriceFilter = res)
        );
        this._productService.thuonghieu$.subscribe(
            (res) => (this.thuonghieuFilter = res)
        );
        let temp;
        this._productService.products$.subscribe((res) => {
            if (res) {
                temp = res;
            }
        });
        if (this.productPriceFilter != null && this.thuonghieuFilter != null) {
            let arr = [];

            temp.filter((x) => {
                if (Object.keys(this.thuonghieuFilter).length > 0) {
                    for (const [key, value] of Object.entries(
                        this.thuonghieuFilter
                    )) {
                        if (x.Thuonghieu == key) {
                            arr.push(x);
                        }
                    }
                } else {
                    arr.push(x);
                }
            });
            arr = arr.filter((x) => x.Gia <= this.productPriceFilter);
            this.splceArr(arr);
        } else if (
            this.productPriceFilter != null &&
            this.thuonghieuFilter == null
        ) {
            if (temp) {
                let arr = temp.filter((x) => x.Gia <= this.productPriceFilter);
                this.splceArr(arr);
            }
        } else if (
            this.thuonghieuFilter != null &&
            this.productPriceFilter == null
        ) {
            let arr = [];
            temp.filter((x) => {
                for (const [key, value] of Object.entries(
                    this.thuonghieuFilter
                )) {
                    if (x.Thuonghieu == key) {
                        arr.push(x);
                    }
                }
            });

            this.splceArr(arr);
        }
    }
    ngOnInit(): void {
        // this.route.params.subscribe((data) => (this.danhmucdetail = data.id));

        this._productService.getProduct().subscribe();
        this._productService.products$.pipe(take(1)).subscribe((res) => {
            if (res) {
                this.tempProductSplice = [];
                if (this.idThuonghieu != '') {
                    this.products = res.filter(
                        (x) => x.Thuonghieu == this.idThuonghieu
                    );
                    localStorage.setItem('thuonghieu', JSON.stringify(""));
                } else {
                    this.products = res;
                }

                let x = this.products?.length / 12;
                if (this.products?.length > 0) {
                    for (let i = 0; i < x; i++) {
                        this.tempProductSplice.push(
                            this.products.splice(0, 12)
                        );
                    }
                }
            }
            this.productDM = this.tempProductSplice[0];
            this.temp = this.productDM;
        });
    }
    splceArr(arr) {
        this.tempProductSplice = [];
        let x = arr.length / 12;
        if (arr.length > 0) {
            for (let i = 0; i < x; i++) {
                this.tempProductSplice.push(arr.splice(0, 12));
            }
        }
        this.productDM = this.tempProductSplice[0];
    }
    productListtoggle(number) {
        this.productListhide = number;
    }
    sapxepgiatri(value) {
        let products;
        let arr;

        this._productService.products$.subscribe((res) => {
            products = res;
        });

        if (value == 'low') {
            arr = products.sort((a, b) => {
                if (a.GiaSale != 0) {
                    return a.GiaSale - b.GiaSale;
                } else {
                    return a.Gia - b.Gia;
                }
            });
        }
        if (value == 'high') {
            arr = products.sort((a, b) => {
                if (b.GiaSale != 0) {
                    return b.GiaSale - a.GiaSale;
                } else {
                    return b.Gia - a.Gia;
                }
            });
        }
        this.splceArr(arr);
    }
    selectSale() {
        this.isChecked = !this.isChecked;

        if (this.isChecked == true) {
            this.productDM = this.productDM.filter((x) => x.Trangthai == '1');
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
