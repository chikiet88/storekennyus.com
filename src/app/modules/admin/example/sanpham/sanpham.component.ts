import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import ClassicEditor from 'ckeditor5/build/ckEditor';

import { SanphamService } from './sanpham.service';
import { FileUploadService } from '../services/file-upload.service';
import { FileUpload } from '../models/file-upload.model';
import { map, take } from 'rxjs';
import { DanhmucService } from '../danhmuc/danhmuc.service';
import { MyUploadAdapter } from '../MyUploadAdapter';
import { ThuonghieuService } from '../thuonghieu/thuonghieu.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'app-sanpham',
    templateUrl: './sanpham.component.html',
    styleUrls: ['./sanpham.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SanphamComponent implements OnInit {
    private readonly notifier: NotifierService;

    productList: FormGroup;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    products: any[];
    isSelectProduct = false;
    percentage = 0;
    danhmucs: any[];
    thuonghieus: any[];
    tenDMcha: string;
    listKeyRemove: any[] = [];
    listkey: any = {};
    listimage: any[] = [];
    isupdateListImage = false;
    tenThuonghieu;
    Danhmuc;
    // thumb = {};
    thumb;
    chipsnhan = [];
    Tags = {};
    i = 0;
    displayedColumns: string[] = [
        'sku',
        'danhmuc',
        'name',
        'thuonghieu',
        'status',
        'price',
        'Image',
        'action',
    ];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        private fb: FormBuilder,
        private sanphamService: SanphamService,
        private uploadService: FileUploadService,
        private _danhmucService: DanhmucService,
        private _thuonghieuService: ThuonghieuService,
        notifierService: NotifierService // private _notifierService: NotifierService
        ) {
            this.notifier = notifierService;
    }
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
        console.log(this.productList.value);
        
        this.productList.get('ListImage').setValue(this.listkey);
        let GiaSale = this.productList.get('GiaSale').value;
        if (GiaSale == 0) {
            this.productList
                .get('GiaSale')
                .setValue(this.productList.get('Gia').value);
        }
        this.sanphamService
            .postProduct(this.productList.value)
            .subscribe((res) => {
                this.notifier.notify('success', `Tạo sản phẩm thành công`);

            });
        this.resetForm();
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
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
    selectNhan(item) {
        let id = item.id;
        if (Object.keys(this.Tags).length > 0) {
            for (const [key, value] of Object.entries(this.Tags)) {
                if (key == id) {
                    delete this.Tags[key];
                } else {
                    this.Tags[id] = true;
                }
            }
        } else {
            this.Tags[id] = true;
        }
        if (this.chipsnhan.length > 0) {
            let index = this.chipsnhan.findIndex((x) => x.id == item.id);
            if (index === -1) {
                this.chipsnhan.push(item);
            } else {
                this.chipsnhan = this.chipsnhan.filter((x) => x.id != item.id);
            }
        } else {
            this.chipsnhan.push(item);
        }
    }
    removeChipsnhan(item) {
        delete this.Tags[item.id];
        console.log(this.Tags);
        this.chipsnhan = this.chipsnhan.filter((x) => x.id != item.id);
    }
    selectProduct(item) {
        this.resetForm()

        this.listimage = [];
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
        this.productList.get('ListImage').setValue(item.ListImage);
        this.productList.get('Tags').setValue(item.Tags);

        this.productList
            .get('ContentImage.contentImage1')
            .setValue(item.ContentImage.contentImage1);
        this.productList
            .get('ContentImage.contentImage2')
            .setValue(item.ContentImage.contentImag2);
        this.productList
            .get('ContentImage.contentImage3')
            .setValue(item.ContentImage.contentImage3);

        this.productList.get('Khoiluong').setValue(item.Khoiluong);
        this.productList.get('Thongtin').setValue(item.Thongtin);
        this.productList.get('Thanhphan').setValue(item.Thanhphan);
        this.productList.get('Huongdan').setValue(item.Huongdan);
        this.productList.get('Ordering').setValue(item.Ordering);
        this.productList.get('Trangthai').setValue(item.Trangthai);
        this.productList.get('SKU').setValue(item.SKU);

        this.thumb = item.Image;
        this.danhmucs.find((x) => {
            if (x.id == item.idDM) {
                this.tenDMcha = x.Tieude;
                console.log(x.Tieude);
            }
        });
        this.thuonghieus.find((x) => {
            if (x.id == item.Thuonghieu) {
                this.tenThuonghieu = x.Tieude;
            }
        });

        this.listkey = item.ListImage || {};
        this.Tags = item.Tags;
        if (Object.keys(item.Tags).length > 0) {
            for (const property in item.Tags) {
                this.danhmucs.filter((x) => {
                    if (x.id == property) {
                        this.chipsnhan.push(x);
                        console.log(x);
                    }
                });
            }
        }
        if (Object.keys(item.ListImage).length > 0) {
            this.isupdateListImage = true;

            for (const property in item.ListImage) {
                console.log(item.ListImage[property]);

                this.uploadService
                    .getValueByKey(item.ListImage[property])
                    .subscribe((res) => {
                        this.listimage.push([...res, item.ListImage[property]]);
                    });
            }
        }
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

        if (this.listimage.length > 0) {
            this.productList.get('ListImage').setValue(this.listkey);
        }
        if (this.chipsnhan.length > 0) {
            this.productList.get('Tags').setValue(this.Tags);
        }
        let GiaSale = this.productList.get('GiaSale').value;
        if (GiaSale == 0) {
            this.productList
                .get('GiaSale')
                .setValue(this.productList.get('Gia').value);
        }

        this.sanphamService
            .updateProduct(this.productList.value)
            .subscribe((res) => {
              

                this.listimage = [];
                this.listkey = {};
                this.Tags = {};
                this.chipsnhan = [];
                this.thumb = ''
                this.notifier.notify('success', `Cập nhật sản phẩm thành công`);

                this.resetForm();
                this.isSelectProduct = false;
                this.tenDMcha = '';
            });

        this.listKeyRemove.forEach((x) => {
            this.uploadService.deleteFile(x);
        });
    }
    onDelete() {
        this.sanphamService
            .deleteSanpham(this.productList.value)
            .subscribe((res) => {
                this.resetForm();
                this.notifier.notify('success', `Xóa sản phẩm thành công`);


                this.isSelectProduct = false;
                this.thumb = '';
            });
    }
    upload(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            this.productList.get('Image').setValue(x.url);
            this.thumb = x.url;
            console.log(this.thumb);
        });
        return;
    }
    upload2(): void {
        if (this.selectedFiles) {
            console.log(this.selectedFiles);
            if (
                Object.keys(this.listkey).length == 0 &&
                this.isupdateListImage == false
            ) {

                for (
                    let i = 0, p = Promise.resolve();
                    i < this.selectedFiles.length;
                    i++
                ) {
                    p = p
                        .then(() =>
                            this.callback(this.selectedFiles.item(i), i)
                        )
                        .then((x: any) => {
                            this.listkey[i] = x.key;
                            if (
                                Object.keys(this.listkey).length ==
                                this.selectedFiles.length
                            ) {
                                for (const property in this.listkey) {
                                    this.uploadService
                                        .getValueByKey(this.listkey[property])
                                        .pipe(take(1))
                                        .subscribe((res) => {
                                            this.listimage.push([
                                                ...res,
                                                this.listkey[property],
                                            ]);
                                            this.isupdateListImage = true;
                                        });
                                }
                            }
                        });
                }
            } else if (
                Object.keys(this.listkey).length != 0 &&
                this.isupdateListImage == true
            ) {
                console.log('truong hop 2');

                let index = Object.keys(this.listkey).length;

                for (
                    let i = 0, p = Promise.resolve();
                    i < this.selectedFiles.length;
                    i++
                ) {
                    p = p
                        .then(() =>
                            this.callback(this.selectedFiles.item(i), i)
                        )
                        .then((x: any) => {
                            index++;
                            this.listkey[index] = x.key;

                            let a =
                                this.listimage.length +
                                this.selectedFiles.length;
                            if (
                                Object.keys(this.listkey).length ==
                                this.listimage.length +
                                    this.selectedFiles.length
                            ) {
                                let a =
                                    this.listimage.length +
                                    this.selectedFiles.length;
                                console.log(a);

                                this.listimage = [];
                                for (const property in this.listkey) {
                                    this.uploadService
                                        .getValueByKey(this.listkey[property])
                                        .pipe(take(1))
                                        .subscribe((res) => {
                                            this.listimage.push([
                                                ...res,
                                                this.listkey[property],
                                            ]);
                                        });
                                }
                            }
                        });
                }
            }
        }

        return;
    }
    deleteImageFirebase(item, i) {
        this.listKeyRemove.push(item[2]);

        for (const i in this.listkey) {
            console.log(this.listkey[i]);

            if (this.listkey[i] == item[2]) {
                delete this.listkey[i];
            }
        }
        this.listimage = this.listimage.filter((x) => x[2] != item[2]);
    }
    getLinkImage(number) {
        this.uploadService
            .getFiles(number) //lấy file  chứa key từ firebase về
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
                console.log(fileUploads);
            });
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
            // if (this.percentage == 100) {
            //     resolve(this.percentage);
            // } else {
            //     reject('sss');
            // }
        });
    }
    selectionDanhmuc(item) {
        this.danhmucs.find((x) => {
            if (x.Tieude == item) {
                this.productList.get('idDM').setValue(x.id);
                this.tenDMcha = x.Tieude;
                this.Danhmuc = x;
            }
        });
    }
    resetForm() {
        this.productList = this.fb.group({
            Tieude: [''],
            Mota: [
                ` <ul>
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
            SKU: [''],
            Tags: [{}],
            ListImage: [{}],
            ContentImage: this.fb.group({
                contentImage1: [''],
                contentImage2: [''],
                contentImage3: [''],
            }),
            GiaSale: [0],
            Gia: [0],
            Image: [''],
            Type: [''],
            Thongtin: [''],
            Ordering: [0],
            Trangthai: [0],
        });
        this.productList.removeControl('id');
        this.listkey = {};
        this.listimage = [];
        this.Tags={}
        this.chipsnhan = []
    }

    ngOnInit(): void {
        this.resetForm();
        this._thuonghieuService.getThuonghieu().subscribe();
        this._thuonghieuService.thuonghieus$.subscribe(
            (res) => (this.thuonghieus = res)
        );
        this._danhmucService.getDanhmuc().subscribe();
        this._danhmucService.danhmucs$.subscribe(
            (res) => (this.danhmucs = res)
        );
        this.sanphamService.getProduct().subscribe();
        this.sanphamService.products$.subscribe((res) => {
            res?.forEach(
                (v) =>
                    (v.TenDM = this.danhmucs?.find(
                        (x) => x.id == v.idDM
                    )?.Tieude)
            );
            res?.forEach(
                (v) =>
                    (v.Tenthuonghieu = this.thuonghieus?.find(
                        (x) => x.id == v.Thuonghieu
                    )?.Tieude)
            );

            if (res) {
                this.products = res;
                this.dataSource = new MatTableDataSource(res.reverse());
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
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
    }
}
