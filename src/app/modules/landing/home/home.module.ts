import { LOCALE_ID, NgModule } from '@angular/core';
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

import { WishlistComponent } from './wishlist/wishlist.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { CartComponent } from './cart/cart.component';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';

import { CheckoutComponent } from './checkout/checkout.component';
import { SigninComponent } from './signin/signin.component';
import { CheckoutDetailComponent } from './checkout-detail/checkout-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PopupProductComponent } from './components/popup-product/popup-product.component';
import { CartPopupComponent } from './components/cart-popup/cart-popup.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThuonghieuComponent } from './thuonghieu/thuonghieu.component';
import { CarouselHomeComponent } from './components/carousel-home/carousel-home.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { SanphamDaxemComponent } from './sanpham-daxem/sanpham-daxem.component';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';
import { CustomPipePipe } from '../customs/custom-pipe.pipe';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchMobileComponent } from './components/search-mobile/search-mobile.component';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
    declarations: [
        LandingHomeComponent,
        HomepageComponent,
        ProductPopularComponent,
        MoreLoveComponent,
        DanhmucComponent,
        GioithieuComponent,
        ContactComponent,
        WishlistComponent,
        BlogComponent,
        BlogDetailComponent,
        CartComponent,
        CheckoutComponent,
        SigninComponent,
        CheckoutDetailComponent,
        ProfileComponent,
        PopupProductComponent,
        CartPopupComponent,
        FooterComponent,
        ThuonghieuComponent,
        CarouselHomeComponent,
        BlogListComponent,
        SanphamDaxemComponent,
        FlashSaleComponent,
        CustomPipePipe,
        ProductListComponent,
        SearchMobileComponent
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'de-DE',
        },
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MaterialExampleModule,
        NgxSliderModule,
        SwiperModule,
        NgxStarRatingModule,
        
    ]
})
export class LandingHomeModule
{
}
