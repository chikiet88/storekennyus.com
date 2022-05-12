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
@NgModule({
    declarations: [
        LandingHomeComponent,
        HomepageComponent,
        ProductPopularComponent,
        MoreLoveComponent
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MaterialExampleModule
        
    ]
})
export class LandingHomeModule
{
}
