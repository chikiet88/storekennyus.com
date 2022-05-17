import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';

export const landingHomeRoutes: Route[] = [
    {
        path: '',
        component: LandingHomeComponent,
        children: [
            { path: '', component: HomepageComponent },
            { path: 'danhmuc', component: DanhmucComponent },
            { path: 'gioithieu', component: GioithieuComponent },
            { path: 'lienhe', component: ContactComponent },
            { path: 'product-list', component: ProductListComponent },
            { path: 'product-list/:slug', component: ProductDetailComponent },

        ],
    },
];
