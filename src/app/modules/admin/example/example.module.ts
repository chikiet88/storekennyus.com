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
import { BaivietComponent } from './baiviet/baiviet.component';
import { ThemesanphamchitietComponent } from './sanpham/themesanphamchitiet/themesanphamchitiet.component';
const exampleRoutes: Route[] = [
    {
        path: '',
        component: ExampleComponent,
        children: [
            { path: 'sanpham', component: SanphamComponent },
            { path: 'sanphamchitiet', component: SanphamchitietComponent },
            {
                path: 'themesanphamchitiet',
                component: ThemesanphamchitietComponent,
            },
            { path: 'danhmuc', component: DanhmucComponent },
            { path: 'baiviet', component: BaivietComponent },
        ],
    },
];

@NgModule({
    declarations: [
        ExampleComponent,
        SanphamComponent,
        DanhmucComponent,
        SanphamchitietComponent,
        BaivietComponent,
        ThemesanphamchitietComponent,
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
