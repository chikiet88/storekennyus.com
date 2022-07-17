import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { DanhmucService } from './danhmuc.service';
// import { DanhmucService } from './danhmuc.service';
import ClassicEditor from 'ckeditor5/build/ckEditor';
import { map, take } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from '@angular/material/tree';
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    id:string,
}
@Component({
    selector: 'app-danhmuc',
    templateUrl: './danhmuc.component.html',
    styleUrls: ['./danhmuc.component.scss'],
})
export class DanhmucComponent implements OnInit {
    themes: any;
    danhmuc: any;
    theme: any;
    thumb;
    icon;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    message: 'chon theme';
    DanhmucList: FormGroup;
    selectTheme: any;
    idSelect;
    Icon;
    public Editor = ClassicEditor;

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
        private DanhmucService: DanhmucService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {}
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    onSubmit() {

        this.DanhmucList.removeControl('tenDMcha');
        this.DanhmucList.removeControl('id');

        this.DanhmucService.AddDanhmuc(this.DanhmucList.value).subscribe(
            (res) => {
                if (res) {
                    alert('Tạo nội dung thành công');
                    this.resetForm();
                } else {
                    alert('Tạo nội dung không thành công');
                }
            }
        );
    }

    onSelectDanhmucCha(item) {
        this.DanhmucList.get('pid').setValue(item.id);
    }
    onSelectDanhmucEdit(item) {
        this.resetForm();

        this.DanhmucList.addControl('id', new FormControl(item.id));
        this.DanhmucList.get('id').setValue(item.id);
        this.DanhmucList.get('Tieude').setValue(item.Tieude);
        this.DanhmucList.get('Mota').setValue(item.Mota);
        this.DanhmucList.get('Image').setValue(item.Image);
        this.DanhmucList.get('Icon').setValue(item.Icon);

        this.DanhmucList.get('pid').setValue(item.pid);
        this.DanhmucList.get('Code').setValue(item.Code);
        this.DanhmucList.get('Type').setValue(item.Type);
        this.DanhmucList.get('Slug').setValue(item.Slug);
        this.DanhmucList.get('Ordering').setValue(item.Ordering);

        this.danhmuc.find((x) => {
            if (x.id == item.pid) {
                this.DanhmucList.get('tenDMcha').setValue(x.Tieude);
            }
        });
        this.idSelect = item.id;
        this.thumb = item.Image;
        this.Icon = item.Icon;
    }
    deleteDanhmuc() {
        this.DanhmucService.deleteDanhmuc(this.idSelect).subscribe((res) => {
            alert('Xóa Danhmuc thành công');
            this.resetForm();

            this.idSelect = undefined;
        });
    }
    updateDanhmuc() {
        this.DanhmucList.removeControl('tenDMcha');
        let node = this.DanhmucList.value
        this.DanhmucService.updateDanhmuc(this.DanhmucList.value).subscribe(
            (res) => {
                this.treeControl.expand(
                    this.treeControl.dataNodes.find((v) => v.id == node.id)
                );
                let x = this.danhmuc.find((v) => v.id == node.idDM);
                while (x) {
                    this.treeControl.expand(
                        this.treeControl.dataNodes.find((v) => v.id == x.id)
                    );
                    x = this.danhmuc.find((v) => v.id == x.pid);
                }
                if (res) {
                    alert('Cập nhật Danh mục thành công');
                    this.resetForm();
                    this.thumb = '';
                    this.Icon = '';
                    this.idSelect = undefined;
                } else {
                    alert('Cập nhật Danh mục không thành công');
                }
            }
        );
    }
    resetForm() {
        this.DanhmucList = this.fb.group({
            Tieude: [''],
            Mota: [''],
            Image: [''],
            Type: [''],
            Icon: [''],
            pid: [''],
            Code: [''],
            Module:[0],
            Ordering:[1],
            Trangthai:[0],
            Slug: [''],
            tenDMcha: [''],
        });
    }
    upload(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            this.DanhmucList.get('Image').setValue(x.url);
            this.thumb = x.url;
        });
        return;
    }
    callback(item, i) {
        return new Promise((resolve, reject) => {
            const file: File | null = item;

            this.currentFileUpload = new FileUpload(file);
            this.uploadService
                .pushFileToStorage(this.currentFileUpload)
                .subscribe(
                    (percentage) => {
                        this.percentage = Math.round(
                            percentage ? percentage : 0
                        );

                        if (percentage == 100) {
                            setTimeout(() => {
                                this.uploadService
                                    .getFiles(1) //lấy file  chứa key từ firebase về
                                    .snapshotChanges()
                                    .pipe(
                                        take(1),
                                        map((changes) =>
                                            // store the key
                                            changes.map((c) => ({
                                                key: c.payload.key,
                                                ...c.payload.val(),
                                            }))
                                        )
                                    )
                                    .subscribe((fileUploads) => {
                                        if (fileUploads[0]?.key) {
                                            fileUploads = fileUploads.reverse();
                                            resolve(fileUploads[0]);
                                        }
                                    });
                            }, 1000);
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
           
        });
    }
    // upload(): void {
    //     if (this.selectedFiles) {
    //         const file: File | null = this.selectedFiles.item(0);
    //         this.selectedFiles = undefined;
    //         if (file) {
    //             this.currentFileUpload = new FileUpload(file);
    //             console.log(this.currentFileUpload);

    //             this.uploadService
    //                 .pushFileToStorage(this.currentFileUpload)
    //                 .subscribe(
    //                     (percentage) => {
    //                         this.percentage = Math.round(
    //                             percentage ? percentage : 0
    //                         );
    //                         if (percentage) {
    //                             this.selectedFiles = undefined;
    //                         }
    //                     },
    //                     (error) => {
    //                         console.log(error);
    //                     }
    //                 );
    //         }
    //     }
    //     this.uploadService._thumb$.subscribe((res) => {
    //         if (res) {
    //             console.log(res);

    //             this.thumb = res;
    //             this.DanhmucList.get('Image').setValue(res);
    //         }
    //     });
    // }

    uploadIcon(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            this.DanhmucList.get('Icon').setValue(x.url);
            this.Icon = x.url;
        });
        return;
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    nest = (items, id = '', link = 'pid') =>
        items
            ?.filter((item) => item[link] == id)
            .map((item) => ({
                ...item,
                children: this.nest(items, item.id),
            }));
    ngOnInit(): void {
        this.resetForm();

        this.DanhmucService.getDanhmuc().subscribe();
        this.DanhmucService.danhmucs$.subscribe((danhmuc) => {
            this.danhmuc = danhmuc;
            if (danhmuc?.length > 0) {
                this.danhmuc = this.nest(danhmuc.reverse())
                this.danhmuc.sort((a,b)=>{
                    return a.Ordering - b.Ordering
                })
                this.dataSource.data = this.danhmuc;
            }
        });

        // this.addheaderService.getHeader().subscribe();

        // this.addheaderService.themes$.subscribe((themes)=>{
        //   this.themes = themes
        // })
    }
}
