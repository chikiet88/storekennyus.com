import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { DanhmucService } from '../../danhmuc/danhmuc.service';
import { ProductListService } from '../../product-list/product-list.service';

@Component({
    selector: 'app-search-mobile',
    templateUrl: './search-mobile.component.html',
    styleUrls: ['./search-mobile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchMobileComponent implements OnInit {
    productSearch: any[];
    searchText: string;
    danhmucSearch;
    products;
    categories;
    productSearchPopup = false;
    constructor(
        private _productListService: ProductListService,
        public dialogRef: MatDialogRef<SearchMobileComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    searchSanpham() {
        if (this.searchText != '') {
            this.searchText = this.searchText.toLocaleLowerCase();
            this.productSearch = this.products.filter((x) => {
                if (x.id == this.danhmucSearch?.id) {
                    x.tenDm = this.danhmucSearch?.Tieude;
                    return x.Tieude.toLocaleLowerCase().includes(
                        this.searchText
                    );
                } else {
                    return x.Tieude.toLocaleLowerCase().includes(
                        this.searchText
                    );
                }
            });
            this.productSearchPopup = true;

            for (let i = 0; i < this.productSearch.length; i++) {
                for (let j = 0; j < this.categories.length; j++) {
                    if (this.productSearch[i].idDM == this.categories[j].id) {
                        this.productSearch[i].tenDm = this.categories[j].Tieude;
                    }
                }
            }
    
        }
    }
    selectCategoriesSearch(item) {
        this.danhmucSearch = item;
    }
    ngOnInit(): void {
        this._productListService.getProduct().subscribe();
        this._productListService.products$.subscribe((res) => {
            this.products = res;
        });
        this._productListService.getDanhmuc().pipe(take(1)).subscribe();
        this._productListService.danhmuc$.subscribe((res) => {
            this.categories = res;
        });
    }
}
