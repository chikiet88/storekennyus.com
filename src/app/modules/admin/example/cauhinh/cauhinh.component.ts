import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, take } from 'rxjs';
import ClassicEditor from 'ckeditor5/build/ckEditor';

import { CauhinhService } from './cauhinh.service';
import { FileUploadService } from '../services/file-upload.service';
import { FileUpload } from '../models/file-upload.model';

@Component({
    selector: 'app-cauhinh',
    templateUrl: './cauhinh.component.html',
    styleUrls: ['./cauhinh.component.scss'],
})
export class CauhinhComponent implements OnInit {
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    idSelect;
    theme: any;
    message: 'chon theme';
    cauhinhList: FormGroup;
    footer: any;
    isUpdate = false
    percentage;
    listKeyRemove = []
    isupdateListImage = false
    listkey: any = {};
    listimage: any[] = [];
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
        private cauhinhService: CauhinhService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
        
    ) {}

    // upload(): void {
    //     this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
    //         this.cauhinhList.get('Image').setValue(x.url);
    //         this.thumb = x.url;
    //         console.log(this.thumb);
    //     });
    //     return;
    // }
    upload2(): void {
        if (this.selectedFiles) {
            console.log(this.selectedFiles);
            if (
                Object.keys(this.listkey).length == 0 &&
                this.isupdateListImage == false
            ) {
                console.log('truong hop 1');

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
                            console.log(this.listkey);

                            console.log(Object.keys(this.listkey).length);

                            console.log(a);
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
        console.log(item);
        console.log(this.listkey);
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
    onSubmit() {
        this.cauhinhList.removeControl('id');
        this.cauhinhList.get('data.imageCarousel').setValue(this.listkey)
        this.cauhinhService
            .addCauhinh(this.cauhinhList.value)
            .subscribe((res) => {
                alert('Tạo nội dung thành công');
                this.resetForm();
            });
    }
    
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    onSelect(item) {
        
        this.cauhinhList.get('id').setValue(item.id);
        this.cauhinhList.get('module').setValue(item.module);
        this.cauhinhList.get('des').setValue(item.des);
        this.cauhinhList.get('data.title').setValue(item.data.title);
        this.cauhinhList.get('data.phone').setValue(item.data.phone);
        this.cauhinhList.get('data.email').setValue(item.data.email);
        this.cauhinhList.get('data.fb').setValue(item.data.fb);
        this.cauhinhList
            .get('data.iframeAddress')
            .setValue(item.data.iframeAddress);
        this.cauhinhList.get('data.day').setValue(item.data.day);
        this.cauhinhList.get('data.month').setValue(item.data.month);
        this.cauhinhList.get('data.year').setValue(item.data.year);
        this.cauhinhList.get('data.date').setValue(item.data.date);
        this.cauhinhList.get('data.endDate').setValue(item.data.endDate);
        this.cauhinhList.get('data.address').setValue(item.data.address);
        this.cauhinhList.get('data.imageCarousel').setValue(item.data.imageCarousel);

        this.idSelect = item.id;
        this.listkey = item.ListImage || {};

        if (Object.keys(item.ListImage).length > 0) {
            this.isupdateListImage = true;

            for (const property in item.ListImage) {
                this.uploadService
                    .getValueByKey(item.ListImage[property])
                    .subscribe((res) => {
                        this.listimage.push([...res, item.ListImage[property]]);
                        console.log(this.listimage);
                    });
            }
        }
    }
    updateCauhinh() {
        this.cauhinhService
            .updateCauhinh(this.cauhinhList.value)
            .subscribe((res) => {
                this.resetForm();
                alert('Cập nhật thành công');
                this.idSelect = undefined
            });
    }

    deleteCauhinh() {
        this.cauhinhService.deleteCauhinh(this.idSelect).subscribe((res) => {
            alert('Xóa bài thành công');
            this.resetForm();
        });
    }
    // updateBaiviet() {
    //     alert('Cập nhật thành công');

    //     this.cauhinhService.updateBaiviet(this.userProfile.value).subscribe();
    // }

    resetForm() {
        this.cauhinhList = this.fb.group({
            id:[''],
            module: [''],
            des: [''],
            data: this.fb.group({
                title: [''],
                phone: [''],
                address: [''],
                email: [''],
                date: [Date],
                endDate: [Date],

                fb: [''],
                day: [0],
                month: [0],
                year: [0],
                iframeAddress: [''],
            }),
        });
    }
    ngOnInit(): void {
        this.resetForm();

        this.cauhinhService.getCauhinh().subscribe();
        this.cauhinhService.cauhinhs$.subscribe((result) => {
            this.footer = result;
        });
    }
}
