import {
    Component,
    OnInit,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, take } from 'rxjs';
import ClassicEditor from 'ckeditor5/build/ckEditor';

import { CauhinhService } from './cauhinh.service';
import { FileUploadService } from '../services/file-upload.service';
import { FileUpload } from '../models/file-upload.model';
import { Cmyk, ColorPickerService } from 'ngx-color-picker';
import { MyUploadAdapter } from '../MyUploadAdapter';

@Component({
    selector: 'app-cauhinh',
    templateUrl: './cauhinh.component.html',
    styleUrls: ['./cauhinh.component.scss'],
    encapsulation: ViewEncapsulation.None,
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
    hexColor;
    percentage;
    thumb1;
    thumb2;
    thumb3;
    thumb4;
    thumb5;
    thumb6;

    thumbmobile1;
    thumbmobile2;
    thumbmobile3;
    thumbmobile4;
    thumbmobile5;

    Color1 
    Color2 
    Color3
    Color4
    Color5  

    Linkbanner1
    Linkbanner2
    Linkbanner3
    Linkbanner4
    Linkbanner5



    isupdateListImage = false;
    listkey: any = {};
    listkeyMobile: any = {};

    listimage: any[] = [];
    listimageMobile: any[] = [];
    listKeyRemove = [];
    listKeyRemoveMobile = [];

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
    public toggle: boolean = false;

    public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

    public colorList = [
        { key: 'flame', value: '#e45a33', friendlyName: 'Flame' },
        { key: 'orange', value: '#fa761e', friendlyName: 'Orange' },
        { key: 'infrared', value: '#ef486e', friendlyName: 'Infrared' },
        { key: 'male', value: '#4488ff', friendlyName: 'Male Color' },
        { key: 'female', value: '#ff44aa', friendlyName: 'Female Color' },
        { key: 'paleyellow', value: '#ffd165', friendlyName: 'Pale Yellow' },
        { key: 'gargoylegas', value: '#fde84e', friendlyName: 'Gargoyle Gas' },
        {
            key: 'androidgreen',
            value: '#9ac53e',
            friendlyName: 'Android Green',
        },
        {
            key: 'carribeangreen',
            value: '#05d59e',
            friendlyName: 'Carribean Green',
        },
        { key: 'bluejeans', value: '#5bbfea', friendlyName: 'Blue Jeans' },
        {
            key: 'cyancornflower',
            value: '#1089b1',
            friendlyName: 'Cyan Cornflower',
        },
        { key: 'warmblack', value: '#06394a', friendlyName: 'Warm Black' },
    ];
    public presetValues: string[] = [];

    public selectedColor: string = 'color1';

    public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
    constructor(
        private cauhinhService: CauhinhService,
        private fb: FormBuilder,
        private uploadService: FileUploadService,
        public vcRef: ViewContainerRef,
        private cpService: ColorPickerService
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
    uploadbannerMobile(i): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            if (i == 1) {
                this.cauhinhList.get('data.Imagemobile1').setValue(x.url);
                this.thumbmobile1 = x.url;
            }
            if (i == 2) {
                this.cauhinhList.get('data.Imagemobile2').setValue(x.url);
                this.thumbmobile2 = x.url;
            }
            if (i == 3) {
                this.cauhinhList.get('data.Imagemobile3').setValue(x.url);
                this.thumbmobile3 = x.url;
            }
            if (i == 4) {
                this.cauhinhList.get('data.Imagemobile4').setValue(x.url);
                this.thumbmobile4 = x.url;
            }
            if (i == 5) {
                this.cauhinhList.get('data.Imagemobile5').setValue(x.url);
                this.thumbmobile5 = x.url;
            }
           
        });
        return;
    }
    handleChange(event,i){
        if (i == 1) {
            this.cauhinhList.get('data.Color1').setValue(event);
        }
        if (i == 2) {
            this.cauhinhList.get('data.Color2').setValue(event);
        }
        if (i == 3) {
            this.cauhinhList.get('data.Color3').setValue(event);
        }
        if (i == 4) {
            this.cauhinhList.get('data.Color4').setValue(event);
        }
        if (i == 5) {
            this.cauhinhList.get('data.Color5').setValue(event);
        }
        
    }
    getColorValues() {
        return this.colorList.map((c) => c.value);
    }

    public onEventLog(event: string, data: any): void {
        console.log(event, data);
    }

    public onChangeColorCmyk(color: string): Cmyk {
        const hsva = this.cpService.stringToHsva(color);

        if (hsva) {
            const rgba = this.cpService.hsvaToRgba(hsva);

            return this.cpService.rgbaToCmyk(rgba);
        }

        return new Cmyk(0, 0, 0, 0);
    }

    public onChangeColorHex8(color: string): string {
        const hsva = this.cpService.stringToHsva(color, true);

        if (hsva) {
            return this.cpService.outputFormat(hsva, 'rgba', null);
        }

        return '';
    }
    upload(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            let max = 0;

            for (const [key, value] of Object.entries(this.listkey)) {
                if (Number(key) > max) {
                    console.log(key);
                    
                    max = Number(key);
                }
            }
           
            if (max > 0) {
                this.listkey[max + 1] = x.key;

                // Object.assign(this.listkey, kiemtracohinhkhong: x.key );
                console.log(this.listkey);
            } else {
                this.listkey[1] = x.key; //vị trí đầu tiên
            }
            let keydetail = x.key;

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

    uploadMobile(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            let max = 0;

            for (const [key, value] of Object.entries(this.listkeyMobile)) {
                if (Number(key) > max) {
                    max = Number(key);
                }
            }

            if (max > 0) {
                this.listkeyMobile[max + 1] = x.key;

                // Object.assign(this.listkeyMobile, kiemtracohinhkhong: x.key );
                console.log(this.listkeyMobile);
            } else {
                this.listkeyMobile[1] = x.key; //vị trí đầu tiên
            }
            let keydetail = x.key;

            this.uploadService
                .getValueByKey(x.key)
                .pipe(take(1))
                .subscribe((res) => {

                    this.listimageMobile.push({
                        ...res,
                        2: keydetail,
                    });
                    console.log(this.listimageMobile);

                });
        });
        return;
    }

    updateCauhinh() {
        console.log(this.listkey);

        if (this.listimage.length > 0) {
            this.cauhinhList.get('data.imageCarousel').setValue(this.listkey);
        }
        if (this.listimageMobile.length > 0) {
            this.cauhinhList.get('data.imageCarouselMobile').setValue(this.listkeyMobile);
        }
        this.cauhinhService
            .updateCauhinh(this.cauhinhList.value)
            .subscribe((res) => {
                alert('Cập nhật thành công');
                this.idSelect = false;
                this.listimage = [];
                this.listimageMobile = [];

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
    deleteImageFirebaseMobile(item, i) {
        this.listKeyRemoveMobile.push(item[2]);

        for (let index in this.listkeyMobile) {
            if (this.listkeyMobile[index] == item[2]) {
                delete this.listkeyMobile[index];
            }
        }

        this.listimageMobile = this.listimageMobile.filter((x) => x[2] != item[2]);
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

        this.cauhinhList.get('data.Imagemobile1').setValue(item.data.Imagemobile1);
        this.cauhinhList.get('data.Imagemobile2').setValue(item.data.Imagemobile2);
        this.cauhinhList.get('data.Imagemobile3').setValue(item.data.Imagemobile3);
        this.cauhinhList.get('data.Imagemobile4').setValue(item.data.Imagemobile4);
        this.cauhinhList.get('data.Imagemobile5').setValue(item.data.Imagemobile5);

        this.cauhinhList.get('data.slug1').setValue(item.data.slug1);
        this.cauhinhList.get('data.slug2').setValue(item.data.slug2);
        this.cauhinhList.get('data.slug3').setValue(item.data.slug3);
        this.cauhinhList.get('data.slug4').setValue(item.data.slug4);
        this.cauhinhList.get('data.slug5').setValue(item.data.slug5);

        this.cauhinhList.get('data.Color1').setValue(item.data.Color1);
        this.cauhinhList.get('data.Color2').setValue(item.data.Color2);
        this.cauhinhList.get('data.Color3').setValue(item.data.Color3);
        this.cauhinhList.get('data.Color4').setValue(item.data.Color4);
        this.cauhinhList.get('data.Color5').setValue(item.data.Color5);

        this.cauhinhList.get('data.Link1').setValue(item.data.Link1);
        this.cauhinhList.get('data.Link2').setValue(item.data.Link2);
        this.cauhinhList.get('data.Link3').setValue(item.data.Link3);
        this.cauhinhList.get('data.Link4').setValue(item.data.Link4);
        this.cauhinhList.get('data.Link5').setValue(item.data.Link5);

        this.cauhinhList.get('data.bannerCombo').setValue(item.data.bannerCombo);
        this.cauhinhList.get('data.Tags').setValue(item.data.Tags);




        this.cauhinhList
            .get('data.Imageflashsale')
            .setValue(item.data.Imageflashsale);

        this.thumb1 = item.data.Image1;
        this.thumb2 = item.data.Image2;
        this.thumb3 = item.data.Image3;
        this.thumb4 = item.data.Image4;
        this.thumb5 = item.data.Image5;
        this.thumb6 = item.data.Imageflashsale;

        this.thumbmobile1 = item.data.Imagemobile1;
        this.thumbmobile2 = item.data.Imagemobile2;
        this.thumbmobile3 = item.data.Imagemobile3;
        this.thumbmobile4 = item.data.Imagemobile4;
        this.thumbmobile5 = item.data.Imagemobile5;

        this.Color1 = item.data.Color1 || '#e45a33'
        this.Color2 = item.data.Color2 || '#e45a33'
        this.Color3 = item.data.Color3 || '#e45a33'
        this.Color4 = item.data.Color4 || '#e45a33'
        this.Color5 = item.data.Color5 || '#e45a33'


        if (item.data.imageCarousel) {
            this.cauhinhList
                .get('data.imageCarousel')
                .setValue(item.data.imageCarousel);
        }
        this.idSelect = true;
        this.listkey = item.data.imageCarousel || {};
this.listkeyMobile = item.data.imageCarouselMobile || {}
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
        if (Object.keys(item.data.imageCarouselMobile).length > 0) {
            this.isupdateListImage = true;

            for (const property in item.data.imageCarouselMobile) {
                this.uploadService
                    .getValueByKey(item.data.imageCarouselMobile[property])
                    .subscribe((res) => {
                        this.listimageMobile.push({
                            ...res,
                            2: this.listkeyMobile[property],
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
                imageCarouselMobile: [''],
                imageCarouselLink:[''],
                Tieude1: [''],
                Image1: [''],
                Imagemobile1: [''],
                slug1: [''],
                Color1: [''],
                Link1:[''],

                Tieude2: [''],
                Image2: [''],
                Imagemobile2: [''],
                slug2: [''],
                Color2: [''],
                Link2:[''],

                Tieude3: [''],
                Image3: [''],
                Imagemobile3: [''],
                slug3: [''],
                Color3: [''],
                Link3:[''],

                Tieude4: [''],
                Image4: [''],
                Imagemobile4: [''],
                slug4: [''],
                Color4: [''],
                Link4:[''],

                Tieude5: [''],
                Image5: [''],
                Imagemobile5: [''],
                slug5: [''],
                Color5: [''],
                Link5:[''],

                Imageflashsale: [''],
                bannerCombo:[''],
                Tags:['']
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
