import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { MaterialExampleModule } from 'material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SanphamComponent } from './sanpham/sanpham.component';
import { SanphamchitietComponent } from './sanphamchitiet/sanphamchitiet.component';
import { ThemesanphamchitietComponent } from './sanpham/themesanphamchitiet/themesanphamchitiet.component';
import { ThuonghieuComponent } from './thuonghieu/thuonghieu.component';
import { MenuComponent } from './menu/menu.component';
import { AddBaivietComponent } from './add-baiviet/add-baiviet.component';
import { ThemeComponent } from './theme/theme.component';
import { DonhangComponent } from './donhang/donhang.component';
import { DonhangDetailComponent } from './donhang-detail/donhang-detail.component';
import { CauhinhComponent } from './cauhinh/cauhinh.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ExampleComponent,
        children: [
            { path: '', component: DonhangComponent },
            // { path: 'donhang/:id', component: DonhangDetailComponent },
            { path: 'sanpham', component: SanphamComponent },
            { path: 'sanphamchitiet', component: SanphamchitietComponent },
            {
                path: 'themesanphamchitiet',
                component: ThemesanphamchitietComponent,
            },
            { path: 'danhmuc', component: DanhmucComponent },
            { path: 'baiviet', component: AddBaivietComponent },
            { path: 'theme', component: ThemeComponent },

            { path: 'thuonghieu', component: ThuonghieuComponent },
            { path: 'menu', component: MenuComponent },
  
            { path: 'cauhinh', component: CauhinhComponent },

        ],
    },
];

@NgModule({
    declarations: [
        ExampleComponent,
        SanphamComponent,
        DanhmucComponent,
        SanphamchitietComponent,
        AddBaivietComponent,
        ThemesanphamchitietComponent,
        ThuonghieuComponent,
        MenuComponent,
        ThemeComponent,
        DonhangComponent,
        DonhangDetailComponent,
        CauhinhComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialExampleModule,
        CommonModule,
        CKEditorModule,
    ],
})
export class ExampleModule {}
