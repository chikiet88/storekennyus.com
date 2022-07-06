import { Route } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list.component';
import { DanhmucDetailResolver } from './product-list.resolvers';
import { DanhsachSanphamComponent } from './sanpham-danhmuc/danhsach-sanpham/danhsach-sanpham.component';
import { SanphamDanhmucComponent } from './sanpham-danhmuc/sanpham-danhmuc.component';

export const samphamRoutes: Route[] = [
    {
        path: ':id',
        component: SanphamDanhmucComponent,
        resolve: {
            detail: DanhmucDetailResolver,
        },
        // children: [{ path: '', component: DanhsachSanphamComponent }],
    },
    // { path: ":id", component: ProductDetailComponent },
];
