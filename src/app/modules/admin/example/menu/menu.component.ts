import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { BaivietService } from '../baiviet/baiviet.service';
import { DanhmucService } from '../danhmuc/danhmuc.service';
import { MenuService } from './menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
    themes: any;
    menu: any;
    theme: any;
    courses: any[];
    message: 'chon theme';
    danhmuc;
    menuForm;
    MenuList: FormGroup;
    selectTheme: any;
    idSelect;
    public config = {
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                },
            ],
        },
    };

    constructor(
        private MenuService: MenuService,
        private fb: FormBuilder,
        private _baivietService: BaivietService,
        private _danhmucSerice: DanhmucService
    ) {}
    resetForm() {
        this.menuForm = {
            title: '',
            parentid: '',
            slug: '',
        };
    }
    ngOnInit(): void {
        this.MenuList = this.fb.group({
            title: [''],
            parentid: [''],
            slug: [''],
            tenMenuCha: [''],
        });
        this.resetForm();

        this.MenuService.getMenu().subscribe();
        this.MenuService.menu$.subscribe((menu) => {
            this.menu = menu;
        });

        this._baivietService.getBaiviet().subscribe();
        this._baivietService.courses$.subscribe((result) => {
            this.courses = result?.filter((x) => x.idDM == 0);
            console.log(this.courses);
        });

        this._danhmucSerice.getDanhmuc().subscribe();
        this._danhmucSerice.danhmucs$.subscribe((res) => (this.danhmuc = res));
        // this.addheaderService.getHeader().subscribe();

        // this.addheaderService.themes$.subscribe((themes)=>{
        //   this.themes = themes
        // })
    }
    onSubmit() {
        console.log(this.menuForm);

        this.MenuList.removeControl('tenMenuCha');
        this.MenuService.Addmenu(this.menuForm).subscribe((res) =>
            alert('Tạo nội dung thành công')
        );
        this.resetForm();
    }

    onSelect(item) {
        // this.MenuList.get('parentid').setValue(item.id);
        this.menuForm.parentid = item.id;
    }
    onSelectMenu(item) {
        console.log(item);

        this.menuForm.id = item.id;
        this.menuForm.title = item.title;
        this.menuForm.slug = item.slug;
        this.menuForm.parentid = item.parentid;

        // this.MenuList.addControl('id', new FormControl(item.id));
        // this.MenuList.get('id').setValue(item.id);
        // this.MenuList.get('title').setValue(item.title);
        // this.MenuList.get('slug').setValue(item.slug);
        // this.MenuList.get('parentid').setValue(item.parentid);
        this.idSelect = item.id;
        this.menu.find((x) => {
            if (x.id == item.parentid) {
                console.log(x);

                this.MenuList.get('tenMenuCha').setValue(x.title);
            }
        });
    }
    onSelectBaiviet(e) {
        this.menuForm.slug = this.menuForm.slug + '/' + e.slug;
        console.log(this.menuForm.slug);
    }
    onSelectdanhmuc(e) {
        this.menuForm.slug = this.menuForm.slug + '/' + e.Slug;
        console.log(this.menuForm.slug);
    }
    deleteMenu() {
        this.MenuList.removeControl('tenMenuCha');

        this.MenuService.deleteMenu(this.idSelect).subscribe((res) => {
            alert('Xóa Menu thành công');
        });
        this.resetForm();
    }
    updateMenu() {
        this.MenuList.removeControl('tenMenuCha');

        this.MenuService.updateMenu(this.menuForm).subscribe((res) =>
            alert('Cập nhật Menu thành công')
        );
        this.resetForm();
    }
}
