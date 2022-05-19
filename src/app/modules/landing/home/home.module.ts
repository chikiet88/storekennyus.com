import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import {MaterialExampleModule} from 'material.modules'
import { HomepageComponent } from './homepage/homepage.component';
import { ProductPopularComponent } from './product-popular/product-popular.component';
import { MoreLoveComponent } from './more-love/more-love.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { SwiperModule } from 'swiper/angular';
import { ContactComponent } from './contact/contact.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItem1Component } from './product-list/product-item1/product-item1.component';
import { ProductItem2Component } from './product-list/product-item2/product-item2.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';


@NgModule({
    declarations: [
        LandingHomeComponent,
        HomepageComponent,
        ProductPopularComponent,
        MoreLoveComponent,
        DanhmucComponent,
        GioithieuComponent,
        ContactComponent,
        ProductListComponent,
        ProductItem1Component,
        ProductItem2Component,
        ProductDetailComponent,
        WishlistComponent,
        BlogComponent,
        BlogDetailComponent
      
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MaterialExampleModule,
        NgxSliderModule,
        SwiperModule,
        NgxStarRatingModule
        
        
    ]
})
export class LandingHomeModule
{
}
