import { FlatTreeControl } from '@angular/cdk/tree';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { map } from 'rxjs';
import { AddBaivietService } from '../add-baiviet/add-baiviet.service';
// import { AddBaivietService } from '../add-baiviet/add-baiviet.service';
import { DanhmucService } from '../danhmuc/danhmuc.service';
import { MenuService } from './menu.service';
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    id:string,
}
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
    slug
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
    private _transformer = (node: any, level: number) => {
        console.log(node);
        node.expandable = !!node.children && node.children.length > 0;
        node.level = level;
        return node;
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        (node) => node.level,
        (node) => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
    );

    dataSource = new MatTreeFlatDataSource(
        this.treeControl,
        this.treeFlattener
    );
    constructor(
        private MenuService: MenuService,
        private fb: FormBuilder,
        private _baivietService: AddBaivietService,
    ) {}
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    nest = (items, id = '', link = 'parentid') =>
    items
        ?.filter((item) => item[link] == id)
        .map((item) => ({
            ...item,
            children: this.nest(items, item.id),
        }));
    resetForm() {
        this.MenuList = this.fb.group({
            title: [''],
            parentid: [''],
            slug: [''],
            tenMenuCha: [''],
            Ordering:[1],
        });
    }

    ngOnInit(): void {
        this.resetForm();

        this.MenuService.getMenu().subscribe();
        this.MenuService.menu$.subscribe((menu) => {
            this.menu = menu
            if (menu?.length > 0) {
                this.menu = this.nest(menu.reverse())
                this.menu.sort((a,b)=>{
                    return a.Ordering - b.Ordering
                })
                this.dataSource.data = this.menu;
            }
        });

        this._baivietService.getBaiviet().subscribe();
        this._baivietService.courses$.subscribe((result) => {
            this.courses = result?.filter((x) => x.des == 'page');
        });

    
       
    }
    onSubmit() {
        this.MenuList.removeControl('tenMenuCha');
        this.MenuList.removeControl('id');

        this.MenuService.Addmenu(this.MenuList.value).subscribe((res) =>
            alert('Tạo nội dung thành công')
        );
        this.resetForm();
    }

    onSelect(item) {
        this.MenuList.get('parentid').setValue(item.id);
        // this.menuForm.parentid = item.id;
    }
    onSelectMenu(item) {
      
        this.MenuList.addControl('id', new FormControl(item.id));
        this.MenuList.get('id').setValue(item.id);
        this.MenuList.get('title').setValue(item.title);
        this.MenuList.get('slug').setValue(item.slug);
        this.MenuList.get('Ordering').setValue(item.Ordering);

        this.MenuList.get('parentid').setValue(item.parentid);
        this.idSelect = item.id;
        this.menu.find((x) => {
            if (x.id == item.parentid) {

                this.MenuList.get('tenMenuCha').setValue(x.title);
            }
        });
    }
    onSelectBaiviet(e) {
        console.log(e);
        
        this.slug  =  'tintuc/' + e.slug;
        this.MenuList.get('slug').setValue(this.slug)
    }
   
    deleteMenu() {
        this.MenuList.removeControl('tenMenuCha');

        this.MenuService.deleteMenu(this.idSelect).subscribe((res) => {
            alert('Xóa Menu thành công');
            this.resetForm();
        });
    }
    updateMenu() {
        this.MenuList.removeControl('tenMenuCha');

        this.MenuService.updateMenu(this.MenuList.value).subscribe((res) => {
            alert('Cập nhật Menu thành công');
            this.resetForm();
            this.idSelect = undefined;
        });
    }
}
