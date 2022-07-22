import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartPopupService } from '../components/cart-popup/cart-popup.service';
import { PopupProductComponent } from '../components/popup-product/popup-product.component';
import { NotifierService } from 'angular-notifier';
import { ProductListService } from '../product-list/product-list.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-product-popular',
    templateUrl: './product-popular.component.html',
    styleUrls: ['./product-popular.component.scss'],
})
export class ProductPopularComponent implements OnInit {
    private readonly notifier: NotifierService;
    TenDM = [];
    @Input() item;
    contentImage = false;
    constructor(
        public dialog: MatDialog,
        private _cartService: CartPopupService,
        private _productService: ProductListService,
        notifierService: NotifierService
    ) {
        this.notifier = notifierService;
    }
    openDialog() {
        const dialogRef = this.dialog.open(PopupProductComponent, {
            data: { dulieu: this.item },
        });
    }
    ngOnInit(): void {
        if (this.item.ContentImage.contentImage1 != '') {
            this.contentImage = true;
        }
        if (Object.keys(this.item.ContentImage).length == 0) {
            this.contentImage = false;
        }
        this._productService.danhmuc$.pipe(take(1)).subscribe((res) => {
            if (this.item.Tags != null) {
                if (Object.keys(this.item.Tags)?.length != 0) {
                    for (const [key, value] of Object.entries(this.item.Tags)) {
                        if (res) {
                            res.forEach((x) => {
                                if (x.id == key) {
                                    this.TenDM.push({
                                        id: x.id,
                                        Tieude: x.Tieude,
                                    });
                                }
                            });
                        }
                    }
                }
            }
            this.item.TenDM = this.TenDM;
        });
    }

    addtocart(item) {
        this._cartService.pushCart(item).subscribe((res) => {
            this.notifier.notify('success', 'Thêm sản phẩm thành công');
        });
    }
}
