import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { ContactComponent } from './contact/contact.component';

export const landingHomeRoutes: Route[] = [
    {
        path     : '',
        component: LandingHomeComponent,
        children:[
            {path:'danhmuc', component:DanhmucComponent},
            {path:'gioithieu', component:GioithieuComponent},
            {path:'lienhe', component:ContactComponent},


        ]
    }
];
