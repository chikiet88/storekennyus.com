import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import ClassicEditor from 'ckeditor5/build/ckEditor';

import { SanphamService } from './sanpham.service';
import { FileUploadService } from '../services/file-upload.service';
import { FileUpload } from '../models/file-upload.model';
import { map } from 'rxjs';
import { DanhmucService } from '../danhmuc/danhmuc.service';
import { MyUploadAdapter } from '../MyUploadAdapter';
import { ThuonghieuService } from '../thuonghieu/thuonghieu.service';

@Component({
    selector: 'app-sanpham',
    templateUrl: './sanpham.component.html',
    styleUrls: ['./sanpham.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SanphamComponent implements OnInit {
    productList: FormGroup;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    products: any[];
    isSelectProduct = false;
    percentage = 0;
    danhmucs: any[];
    thuonghieus: any[];
    tenDMcha: string;
    // thumb = {};
    thumb;
    i = 0;
    constructor(
        private fb: FormBuilder,
        private sanphamService: SanphamService,
        private uploadService: FileUploadService,
        private _danhmucService: DanhmucService,
        private _thuonghieuService: ThuonghieuService
    ) {}
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

    onSubmit() {
        let GiaSale = this.productList.get('GiaSale').value;
        if (GiaSale == 0) {
            this.productList
                .get('GiaSale')
                .setValue(this.productList.get('Gia').value);
        }
        this.sanphamService
            .postProduct(this.productList.value)
            .subscribe((res) => {
                alert('Tạo sản phẩm thành công');
            });
        this.resetForm();
    }
    public onReady(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader, this.uploadService);
        };

        editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
    }
    selectProduct(item) {
        this.isSelectProduct = true;
        this.productList.addControl('id', new FormControl(item.id));
        this.productList.get('Tieude').setValue(item.Tieude);
        this.productList.get('idDM').setValue(item.idDM);

        this.productList.get('Mota').setValue(item.Mota);
        this.productList.get('Type').setValue(item.Type);
        this.productList.get('Image').setValue(item.Image);
        this.productList.get('Gia').setValue(item.Gia);
        this.productList.get('GiaSale').setValue(item.GiaSale);
        this.productList.get('Slug').setValue(item.Slug);
        this.productList.get('Thuonghieu').setValue(item.Thuonghieu);

        this.productList.get('Khoiluong').setValue(item.Khoiluong);
        this.productList.get('Thongtin').setValue(item.Thongtin);
        this.productList.get('Thanhphan').setValue(item.Thanhphan);
        this.productList.get('Huongdan').setValue(item.Huongdan);
        this.productList.get('Ordering').setValue(item.Ordering);
        this.productList.get('Trangthai').setValue(item.Trangthai);
        this.thumb = item.Image;
        this.danhmucs.find((x) => {
            if (x.id == item.idDM) {
                this.tenDMcha = x.Tieude;
                console.log(x.Tieude);
            }
        });
    }
    selectionThuonghieu(value) {
        this.thuonghieus.find((x) => {
            if (x.Tieude == value) {
                this.productList.get('Thuonghieu').setValue(x.id);
            }
        });
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    onUpdate() {
        let GiaSale = this.productList.get('GiaSale').value;
        if (GiaSale == 0) {
            this.productList
                .get('GiaSale')
                .setValue(this.productList.get('Gia').value);
        }
        this.sanphamService
            .updateProduct(this.productList.value)
            .subscribe((res) => {
                alert('Cập nhật thành công');
                this.resetForm();
                this.isSelectProduct = false;
                this.tenDMcha = '';
            });
    }
    onDelete() {
        this.sanphamService
            .deleteSanpham(this.productList.value)
            .subscribe((res) => {
                this.resetForm();
                this.isSelectProduct = false;
                this.thumb = '';
            });
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
            this.thumb = res?.url;
            // Object.assign(this.thumb, a);
            this.productList.get('Image').setValue(res?.url);
        });
    }
    selectionDanhmuc(item) {
        this.danhmucs.find((x) => {
            if (x.Tieude == item) {
                this.productList.get('idDM').setValue(x.id);
                this.tenDMcha = x.Tieude;
                console.log(x.Tieude);
            }
        });
    }
    resetForm() {
        this.productList = this.fb.group({
            Tieude: [''],
            Mota: [
                `  <ul>
                <li class="mr-3 text-md lg:text-base flex items-center my-1">
                    <span class="material-icons mr-3 text-md text-green-500">done </span>Cải thiện trí nhớ, khả năng tập trung và tập trung
                </li>
                <li class="mr-3 text-md lg:text-base flex items-center my-1">
                    <span class="material-icons mr-3 text-md text-green-500">done </span>Đã được kiểm nghiệm lâm sàng
                </li>
                <li class="mr-3 text-md lg:text-base flex items-center my-1">
                    <span class="material-icons mr-3 text-md text-green-500">done </span>Tăng cường dinh dưỡng có lợi cho não bộ
                </li>
            </ul>`,
            ],
            Thanhphan: [''],
            Huongdan: [''],
            idDM: [''],
            Khoiluong: [''],
            Thuonghieu: [''],
            Code: [''],
            Slug: [''],
            SKU: [0],
            Tag: [''],
            GiaSale: [0],
            Gia: [0],
            Image: [''],
            Type: [''],
            Thongtin: [''],
            Ordering: [0],
            Trangthai: [''],
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
        this._thuonghieuService.getThuonghieu().subscribe();
        this._thuonghieuService.thuonghieus$.subscribe(
            (res) => (this.thuonghieus = res)
        );
    }
}
