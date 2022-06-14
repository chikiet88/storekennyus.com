import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import ClassicEditor from 'ckeditor5/build/ckEditor';

import { SanphamService } from './sanpham.service';
import { FileUploadService } from '../services/file-upload.service';
import { FileUpload } from '../models/file-upload.model';
import { map } from 'rxjs';
import { DanhmucService } from '../danhmuc/danhmuc.service';

@Component({
    selector: 'app-sanpham',
    templateUrl: './sanpham.component.html',
    styleUrls: ['./sanpham.component.scss'],
})
export class SanphamComponent implements OnInit {
    productList: FormGroup;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    products: any[];
    isSelectProduct = false
    percentage = 0;
    danhmucs: any[];
    thumb = {};
    i = 0;
    constructor(
        private fb: FormBuilder,
        private sanphamService: SanphamService,
        private uploadService: FileUploadService,
        private _danhmucService: DanhmucService
    ) {}
    public Editor = ClassicEditor;
    public config = {
        // htmlSupport: {
        //     allow: [
        //         {
        //             name: /.*/,
        //             attributes: true,
        //             classes: true,
        //         },
        //     ],
        // },
    };

    onSubmit() {
        this.sanphamService
            .postProduct(this.productList.value)
            .subscribe((res) => {
                alert('Tạo sản phẩm thành công');
            });
        this.resetForm();
    }

    selectProduct(item) {
        this.isSelectProduct = true
        this.productList.addControl('id', new FormControl(item.id));
        this.productList.get('name').setValue(item.name);
        this.productList.get('des').setValue(item.des);
        this.productList.get('status').setValue(item.status);
        this.productList.get('Type').setValue(item.Type);
        this.productList.get('image').setValue(item.image);

        this.productList.get('price').setValue(item.price);
        this.productList.get('oldprice').setValue(item.oldprice);
        this.productList.get('slug').setValue(item.slug);
        this.productList.get('khoiluong').setValue(item.khoiluong);
        this.productList.get('infor').setValue(item.infor);
        this.productList.get('mota').setValue(item.Mota);
        this.productList.get('thanhphan').setValue(item.thanhphan);
        this.productList.get('huongdan').setValue(item.huongdan);
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    onUpdate() {
        this.sanphamService
            .updateProduct(this.productList.value)
            .subscribe((res) => {
                alert('Cập nhật thành công');
            });
        this.resetForm();
    }
    onDelete() {
        this.sanphamService
            .deleteSanpham(this.productList.value)
            .subscribe((res) => alert('Xóa sản phẩm thành công'));
        this.resetForm();
    }
    upload(): void {
        this.i++;

        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;
            if (file) {
                this.currentFileUpload = new FileUpload(file);
                this.uploadService
                    .pushFileToStorage(this.currentFileUpload)
                    .subscribe(
                        (percentage) => {
                            this.percentage = Math.round(
                                percentage ? percentage : 0
                            );
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        }
        this.uploadService._thumb$.subscribe((res) => {
            let a = {};
            a[this.i] = res;

            Object.assign(this.thumb, a);
            this.productList.get('image').setValue(this.thumb);
        });
    }
    selectionDanhmuc(item) {
        console.log(item);

        this.productList.get('idDM').setValue(item.id);
    }
    resetForm() {
        this.productList = this.fb.group({
            name: [''],
            des: [''],
            status: [''],
            mota: [''],
            thanhphan: [''],
            huongdan:[''],
            idDM: [''],
            khoiluong: [''],
            slug: [''],
            SKU: [0],
            tag: [''],
            price: [''],
            oldprice: [''],
            image: [''],
            Type: [''],
            infor: [''],
        });
    }

    ngOnInit(): void {
        this.resetForm();
        this.sanphamService.getProduct().subscribe();
        this.sanphamService.products$.subscribe((res) => (this.products = res));
        this.uploadService
            .getFiles(1)
            .snapshotChanges()
            .pipe(
                map((changes) =>
                    // store the key
                    changes.map((c) => ({
                        key: c.payload.key,
                        ...c.payload.val(),
                    }))
                )
            )
            .subscribe((fileUploads) => {
                // this.fileUploads = fileUploads.reverse();
                // console.log(fileUploads);
                return fileUploads;
            });

        this._danhmucService.getDanhmuc().subscribe();
        this._danhmucService.danhmucs$.subscribe(
            (res) => (this.danhmucs = res)
        );
    }
}
