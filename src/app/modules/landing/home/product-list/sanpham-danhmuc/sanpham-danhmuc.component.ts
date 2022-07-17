import { LabelType, Options } from '@angular-slider/ngx-slider';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { ThuonghieuService } from '../../thuonghieu/thuonghieu.service';
import { ProductListService } from '../product-list.service';

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-sanpham-danhmuc',
    templateUrl: './sanpham-danhmuc.component.html',
    styleUrls: ['./sanpham-danhmuc.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SanphamDanhmucComponent implements OnInit {
    selectedSendingFeatures;
    iCheckbox = [];
    tempProductSplice: any[] = [];
    productDM: any[];
    danhmuc: any[];
    danhmucdetail: any;
    selectCheckboxThuonghieu: any[] = [];
    selectedIndex: number;
    productListhide: number;
    temp: any[];
    isChecked = false;
    indexPaginate: number = 0;
    arrcheckbox = {};
    filterThuonghieu = [];
    tempAllProducts: any[] = [];
    tempDM: any[] = [];
    productCard
    min = 0;
    max = 2000000 ;
    thumbLabel = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    valuePrice: number;

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

    thuonghieus: string[] = [];
    changePrice() {
      console.log(this.valuePrice);
      
        this._productService.getPriceFilter(this.valuePrice).subscribe();
        
    }
    productListtoggle(number) {
        this.productListhide = number;
    }
    constructor(
        private _productService: ProductListService,
        private _thuonghieuService: ThuonghieuService,
        private _route: ActivatedRoute
    ) {
        this.productListhide = 1;
    }
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    paginateNumber(i) {
        this.indexPaginate = i;
        console.log(i);

        this.productDM = this.tempProductSplice[i];
    }
    selectSale() {
        this.isChecked = !this.isChecked;

        if (this.isChecked == true) {
            this.productDM = this.productDM.filter((x) => x.Trangthai == '1');
        } else {
            this.productDM = this.temp;
        }
    }
    checkboxThuonghieu(item, i) {
        let id = item.id;

        if (Object.keys(this.arrcheckbox).length > 0) {
            for (const [key, value] of Object.entries(this.arrcheckbox)) {
                if (key == id) {
                    delete this.arrcheckbox[key];
                } else {
                    this.arrcheckbox[id] = true;
                }
            }
        } else {
            this.arrcheckbox[id] = true;
        }

        this._productService.getThuonghieuFilter(this.arrcheckbox).subscribe();
    }

    nest = (items, id = '', link = 'pid') =>
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
            if (res) {
                this.danhmuc = this.nest(res);
                this.dataSource.data = this.danhmuc;
            }
        });

        this._thuonghieuService.getThuonghieu().subscribe();
        this._thuonghieuService.thuonghieus$.subscribe(
            (res) => (this.thuonghieus = res)
        );
        this._productService.getProduct().subscribe()
        this._productService.products$.subscribe(res=>{
            let productCard = res?.filter(x=> x.Type == 'danhmucnoibat')
            this.productCard = productCard.sort(() => 0.5 - Math.random())
        })
    }
}
