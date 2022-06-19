import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { ThuonghieuService } from './thuonghieu.service';

@Component({
  selector: 'app-thuonghieu',
  templateUrl: './thuonghieu.component.html',
  styleUrls: ['./thuonghieu.component.scss']
})
export class ThuonghieuComponent implements OnInit {
  thumb
  thuonghieu
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    message: 'chon theme';
    ThuonghieuForm: FormGroup;
    idSelect;

  

    constructor(
        private _thuonghieuService: ThuonghieuService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {}

    onSubmit() {
        this.ThuonghieuForm.removeControl('id');

        this._thuonghieuService.AddThuonghieu(this.ThuonghieuForm.value).subscribe(
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
        this.ThuonghieuForm.get('pid').setValue(item.id);
    }
    onSelectDanhmucEdit(item) {
        this.resetForm();

        this.ThuonghieuForm.addControl('id', new FormControl(item.id));
        this.ThuonghieuForm.get('id').setValue(item.id);
        this.ThuonghieuForm.get('Tieude').setValue(item.Tieude);
        this.ThuonghieuForm.get('Slug').setValue(item.Slug);
       
        this.idSelect = item.id;
        this.thumb = item.Image;
    }
    deleteDanhmuc() {
        alert('Xóa Danhmuc thành công');
        this._thuonghieuService.deleteThuonghieu(this.idSelect).subscribe();
        this.resetForm();
    }
    updateDanhmuc() {
        this.ThuonghieuForm.removeControl('tenDMcha');

        this._thuonghieuService.updateThuonghieu(this.ThuonghieuForm.value).subscribe(
            (res) => {
                if (res) {
                    alert('Cập nhật Danh mục thành công');
                } else {
                    alert('Cập nhật Danh mục không thành công');
                }
            }
        );
        this.resetForm();
    }
    resetForm() {
        this.ThuonghieuForm = this.fb.group({
            Tieude: [''],
            Image: [''],
            Slug:[''],
            Type: [''],
            Trangthai:[0],
            id:['']
          
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

                this.thumb = res.url;
                this.ThuonghieuForm.get('Image').setValue(res.url);
            }
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

            this.thuonghieu = res;
        });

        
    }

}
