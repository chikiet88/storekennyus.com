import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, take } from 'rxjs';
import { FileUpload } from '../models/file-upload.model';
import { SanphamService } from '../sanpham/sanpham.service';
import { FileUploadService } from '../services/file-upload.service';
import { ThuonghieuService } from './thuonghieu.service';

@Component({
    selector: 'app-thuonghieu',
    templateUrl: './thuonghieu.component.html',
    styleUrls: ['./thuonghieu.component.scss'],
})
export class ThuonghieuComponent implements OnInit {
    thumb;
    thuonghieu;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    message: 'chon theme';
    ThuonghieuForm: FormGroup;
    idSelect;
    products: any[] = [];
    displayedColumns: string[] = [
        'thuonghieu',
        'Image',
        'action',
    ];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        private _thuonghieuService: ThuonghieuService,
        private fb: FormBuilder,
        private uploadService: FileUploadService,
        private _sanphamService: SanphamService
    ) {}
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    onSubmit() {
        this.ThuonghieuForm.removeControl('id');

        this._thuonghieuService
            .AddThuonghieu(this.ThuonghieuForm.value)
            .subscribe((res) => {
                if (res) {
                    alert('Tạo nội dung thành công');
                    this.resetForm();
                } else {
                    alert('Tạo nội dung không thành công');
                }
            });
    }

    onSelectDanhmucCha(item) {
        this.ThuonghieuForm.get('pid').setValue(item.id);
    }
    onSelectDanhmucEdit(item) {
        this.resetForm();

        this.ThuonghieuForm.addControl('id', new FormControl(item.id));
        this.ThuonghieuForm.get('id').setValue(item.id);
        this.ThuonghieuForm.get('Tieude').setValue(item.Tieude);
        this.ThuonghieuForm.get('Image').setValue(item.Image);

        this.idSelect = item.id;
        this.thumb = item.Image;
    }
    deleteDanhmuc() {
        this._thuonghieuService
            .deleteThuonghieu(this.idSelect)
            .subscribe((res) => {
                alert('Xóa thương hiệu thành công');
                this.resetForm();
                this.idSelect = undefined;
            });
    }
    updateDanhmuc() {
        this.ThuonghieuForm.removeControl('tenDMcha');

        this._thuonghieuService
            .updateThuonghieu(this.ThuonghieuForm.value)
            .subscribe((res) => {
                if (res) {
                    alert('Cập nhật Thương hiệu thành công');
                    this.idSelect = undefined;
                    this.resetForm();
                } else {
                    alert('Cập nhật Thương hiệu không thành công');
                }
            });
    }
    resetForm() {
        this.ThuonghieuForm = this.fb.group({
            Tieude: [''],
            Image: [''],
            Trangthai: [1],
            id: [''],
        });
        this.thumb = ''
        this.idSelect = undefined
        this.ThuonghieuForm.removeControl('id')
    }
    upload(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            this.ThuonghieuForm.get('Image').setValue(x.url);
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
            // if (this.percentage == 100) {
            //     resolve(this.percentage);
            // } else {
            //     reject('sss');
            // }
        });
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    ngOnInit(): void {
        this.resetForm();

        this._thuonghieuService.getThuonghieu().subscribe();
        this._thuonghieuService.thuonghieus$.subscribe((res) => {
            console.log(res);
            this.dataSource = new MatTableDataSource(res);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        this._sanphamService.getProduct().subscribe();
        this._sanphamService.products$.subscribe(
            (res) => (this.products = res)
        );
    }
}
