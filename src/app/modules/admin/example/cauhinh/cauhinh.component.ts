import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import ClassicEditor from 'ckeditor5/build/ckEditor';

import { CauhinhService } from './cauhinh.service';

@Component({
    selector: 'app-cauhinh',
    templateUrl: './cauhinh.component.html',
    styleUrls: ['./cauhinh.component.scss'],
})
export class CauhinhComponent implements OnInit {
    idSelect;
    theme: any;
    message: 'chon theme';
    cauhinhList: FormGroup;
    footer: any;
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
        private fb: FormBuilder
    ) {}

    onSubmit() {
        this.cauhinhList.removeControl('id');

        this.cauhinhService
            .addCauhinh(this.cauhinhList.value)
            .subscribe((res) => {
                alert('Tạo nội dung thành công');
                this.resetForm();
            });
    }
    // onFileChange(file){
    //   this.cauhinhList.get('logo').setValue(file.target.files);

    // }
    onSelect(item) {
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

        this.cauhinhList.get('data.address').setValue(item.data.address);
        this.cauhinhList.addControl('id', new FormControl(item.id));
        this.cauhinhList.get('id').setValue(item.id);

        this.idSelect = item.id;
    }
    updateCauhinh() {
        this.cauhinhService
            .updateCauhinh(this.cauhinhList.value)
            .subscribe((res) => {
                this.resetForm();
                alert('Cập nhật thành công');
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
            module: [''],
            des: [''],
            data: this.fb.group({
                title: [''],
                phone: [''],
                address: [''],
                email: [''],
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
