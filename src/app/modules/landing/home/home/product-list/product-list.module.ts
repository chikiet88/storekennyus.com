import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SwiperModule } from "swiper/angular";

import { ProductListComponent } from "./product-list.component";
import { samphamRoutes } from "./product-list.routing";
import { ProductItem1Component } from "./product-item1/product-item1.component";
import { ProductItem2Component } from "./product-item2/product-item2.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NgxStarRatingModule } from "ngx-star-rating";
import { MaterialExampleModule } from "material.modules";
import { FormsModule } from "@angular/forms";
import { SanphamDanhmucComponent } from "./sanpham-danhmuc/sanpham-danhmuc.component";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { ProductPopularComponent } from "./product-popular/product-popular.component";
import { DanhsachSanphamComponent } from './sanpham-danhmuc/danhsach-sanpham/danhsach-sanpham.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
@NgModule({
  declarations: [
    ProductItem1Component,
    ProductItem2Component,
    ProductDetailComponent,
    SanphamDanhmucComponent,
    ProductPopularComponent,
    DanhsachSanphamComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule.forChild(samphamRoutes),
    MaterialExampleModule,
    SwiperModule,
    NgxSliderModule,
    FormsModule,
    NgxStarRatingModule,
    NgxImageZoomModule,
  ],
})
export class SanphamModule {}
