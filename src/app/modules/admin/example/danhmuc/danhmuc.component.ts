import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { DanhmucService } from './danhmuc.service';
// import { DanhmucService } from './danhmuc.service';
import ClassicEditor from 'ckeditor5/build/ckEditor';

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

    constructor(
        private DanhmucService: DanhmucService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {}

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
        this.DanhmucList.get('code').setValue(item.code);
        this.DanhmucList.get('Type').setValue(item.Type);
        this.DanhmucList.get('Slug').setValue(item.Slug);
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

        this.DanhmucService.updateDanhmuc(this.DanhmucList.value).subscribe(
            (res) => {
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
            code: [''],
            Slug: [''],
            tenDMcha: [''],
        });
    }
    upload(): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;
            if (file) {
                this.currentFileUpload = new FileUpload(file);
                console.log(this.currentFileUpload);

                this.uploadService
                    .pushFileToStorage(this.currentFileUpload)
                    .subscribe(
                        (percentage) => {
                            this.percentage = Math.round(
                                percentage ? percentage : 0
                            );
                            if (percentage) {
                                this.selectedFiles = undefined;
                            }
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        }
        this.uploadService._thumb$.subscribe((res) => {
            if (res) {
                console.log(res);

                this.thumb = res;
                this.DanhmucList.get('Image').setValue(res);
            }
        });
    }

    uploadIcon(): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;
            if (file) {
                this.currentFileUpload = new FileUpload(file);
                console.log(this.currentFileUpload);

                this.uploadService
                    .pushFileToStorage(this.currentFileUpload)
                    .subscribe(
                        (percentage) => {
                            this.percentage = Math.round(
                                percentage ? percentage : 0
                            );
                            if (percentage) {
                                this.selectedFiles = undefined;
                            }
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        }
        this.uploadService._thumb$.subscribe((res) => {
            if (res) {
                console.log(res);

                this.icon = res;
                this.DanhmucList.get('Icon').setValue(res.url);
            }
        });
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    ngOnInit(): void {
        this.resetForm();

        this.DanhmucService.getDanhmuc().subscribe();
        this.DanhmucService.danhmucs$.subscribe((danhmuc) => {
            console.log(danhmuc);

            this.danhmuc = danhmuc;
        });

        // this.addheaderService.getHeader().subscribe();

        // this.addheaderService.themes$.subscribe((themes)=>{
        //   this.themes = themes
        // })
    }
}
