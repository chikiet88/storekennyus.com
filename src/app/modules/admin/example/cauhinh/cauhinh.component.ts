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
    idSelect = false;
    theme: any;
    listImageCarousel: any = {};
    message: 'chon theme';
    cauhinhList: FormGroup;
    footer: any;
    i = 0;
    isUpdate = false;
    percentage;
    listKeyRemove = [];
    thumb1;
    thumb2;
    thumb3;
    thumb4;
    thumb5;
    thumb6
    isupdateListImage = false;
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

    uploadbanner(i): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            if (i == 1) {
                this.cauhinhList.get('data.Image1').setValue(x.url);
                this.thumb1 = x.url;
            }
            if (i == 2) {
                this.cauhinhList.get('data.Image2').setValue(x.url);
                this.thumb2 = x.url;
            }
            if (i == 3) {
                this.cauhinhList.get('data.Image3').setValue(x.url);
                this.thumb3 = x.url;
            }
            if (i == 4) {
                this.cauhinhList.get('data.Image4').setValue(x.url);
                this.thumb4 = x.url;
            }
            if (i == 5) {
                this.cauhinhList.get('data.Image5').setValue(x.url);
                this.thumb5 = x.url;
            }
            if (i == 6) {
                this.cauhinhList.get('data.Imageflashsale').setValue(x.url);
                this.thumb6 = x.url;
            }
        });
        return;
    }
    upload(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            let kiemtracohinhkhong = Object.keys(this.listkey).length;
            if (kiemtracohinhkhong > 0) {
                this.listkey[kiemtracohinhkhong] = x.key;
            } else {
                this.listkey[0] = x.key; //vị trí đầu tiên
            }
            let keydetail = x.key;
            console.log(keydetail);

            this.uploadService
                .getValueByKey(x.key)
                .pipe(take(1))
                .subscribe((res) => {
                    console.log(res);

                    this.listimage.push({
                        ...res,
                        2: keydetail,
                    });
                    console.log(this.listimage);

                    this.isupdateListImage = true;
                });
        });
        return;
    }

    updateCauhinh() {
        console.log(this.listkey);

        if (this.listimage.length > 0) {
            this.cauhinhList.get('data.imageCarousel').setValue(this.listkey);
        }
        this.cauhinhService
            .updateCauhinh(this.cauhinhList.value)
            .subscribe((res) => {
                alert('Cập nhật thành công');
                this.idSelect = false;
                this.listimage = [];
            });
        this.listKeyRemove.forEach((x) => {
            this.uploadService.deleteFile(x);
        });
        this.listImageCarousel = {};
    }
    deleteImageFirebase(item, i) {
        this.listKeyRemove.push(item[2]);

        for (let index in this.listkey) {
            if (this.listkey[index] == item[2]) {
                delete this.listkey[index];
            }
        }

        this.listimage = this.listimage.filter((x) => x[2] != item[2]);
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
    onSelect(item) {
        this.i = Object.keys(item.data.imageCarousel).length - 1;
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
        this.cauhinhList.get('data.Tieude1').setValue(item.data.Tieude1);
        this.cauhinhList.get('data.Tieude2').setValue(item.data.Tieude2);
        this.cauhinhList.get('data.Tieude3').setValue(item.data.Tieude3);
        this.cauhinhList.get('data.Tieude4').setValue(item.data.Tieude4);
        this.cauhinhList.get('data.Tieude5').setValue(item.data.Tieude5);
        this.cauhinhList.get('data.Image1').setValue(item.data.Image1);
        this.cauhinhList.get('data.Image2').setValue(item.data.Image2);
        this.cauhinhList.get('data.Image3').setValue(item.data.Image3);
        this.cauhinhList.get('data.Image4').setValue(item.data.Image4);
        this.cauhinhList.get('data.Image5').setValue(item.data.Image5);
        this.cauhinhList.get('data.Imageflashsale').setValue(item.data.Imageflashsale);

        this.thumb1 = item.data.Image1;
        this.thumb2 = item.data.Image2;
        this.thumb3 = item.data.Image3;
        this.thumb4 = item.data.Image4;
        this.thumb5 = item.data.Image5;
        this.thumb6 = item.data.Imageflashsale;

        if (item.data.imageCarousel) {
            this.cauhinhList
                .get('data.imageCarousel')
                .setValue(item.data.imageCarousel);
        }
        this.idSelect = true;
        this.listkey = item.data.imageCarousel || {};
        console.log(this.listkey);

        if (Object.keys(item.data.imageCarousel).length > 0) {
            this.isupdateListImage = true;

            for (const property in item.data.imageCarousel) {
                this.uploadService
                    .getValueByKey(item.data.imageCarousel[property])
                    .subscribe((res) => {
                        this.listimage.push({
                            ...res,
                            2: this.listkey[property],
                        });
                    });
            }
        }
    }

    deleteCauhinh() {
        this.cauhinhService
            .deleteCauhinh(this.cauhinhList.value)
            .subscribe((res) => {
                alert('Xóa bài thành công');
                this.idSelect = false;

                this.resetForm();
            });
    }
    // updateBaiviet() {
    //     alert('Cập nhật thành công');

    //     this.cauhinhService.updateBaiviet(this.userProfile.value).subscribe();
    // }

    resetForm() {
        this.cauhinhList = this.fb.group({
            id: [''],
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
                imageCarousel: [''],
                Tieude1: [''],
                Image1: [''],
                slug1: [''],
                Tieude2: [''],
                Image2: [''],
                slug2: [''],
                Tieude3: [''],
                Image3: [''],
                slug3: [''],
                Tieude4: [''],
                Image4: [''],
                slug4: [''],
                Tieude5: [''],
                Image5: [''],
                slug5: [''],
                Imageflashsale:[''],
            }),
        });
    }
    ngOnInit(): void {
        this.resetForm();
        this.cauhinhService.getCauhinh().subscribe();
        this.cauhinhService.cauhinhs$.subscribe((result) => {
            if (result) {
                this.footer = result[0];
                this.onSelect(this.footer);
            }
        });
    }
}
