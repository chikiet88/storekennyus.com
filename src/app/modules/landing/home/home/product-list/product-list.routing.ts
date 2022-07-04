import { Route } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list.component";
// import { DanhsachSanphamComponent } from "./sanpham-danhmuc/danhsach-sanpham/danhsach-sanpham.component";
import { SanphamDanhmucComponent } from "./sanpham-danhmuc/sanpham-danhmuc.component";

export const samphamRoutes: Route[] = [
  {
    path: "",
    component: SanphamDanhmucComponent,
    children: [
        // {path:'', component:DanhsachSanphamComponent}
    ],
  },
  { path: ":id", component: ProductDetailComponent },
];
