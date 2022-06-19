import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ThemeService } from './theme.service';
import ClassicEditor from 'ckeditor5/build/ckEditor';
import { Observable } from 'rxjs';
import { MyUploadAdapter } from '../MyUploadAdapter';
import { FileUploadService } from '../services/file-upload.service';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements OnInit {
    themes: any;
    theme: any;
    message: 'chon theme';
    userProfile: FormGroup;
    selectTheme: any;
    menu: any;
    idtheme;
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
        private themeService: ThemeService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {}

    onSubmit() {
        this.userProfile.removeControl('id')
        this.themeService.postTheme(this.userProfile.value).subscribe((res) => {
            alert('Tạo nội dung thành công');
            this.resetForm();

        });
    }

    updateTheme() {
        this.themeService
            .updateTheme(this.userProfile.value)
            .subscribe((res) => {
                alert('Cập nhật thành công');
                this.resetForm();
            });
    }
    deleteTheme() {
        this.themeService.deleteTheme(this.idtheme).subscribe((res) => {
            alert('Xóa thêm thành công');
            this.resetForm();
        });
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
        this.idtheme = item.id;
        console.log(item);
        this.userProfile.get('content1').setValue(item?.content1);

        this.userProfile.get('content2').setValue(item?.content2);
        this.userProfile
            .get('slide1.titleCarousel')
            .setValue(item?.slide1.titleCarousel);
        this.userProfile
            .get('slide1.desCarousel')
            .setValue(item?.slide1.desCarousel);
        this.userProfile
            .get('slide1.contentCarousel')
            .setValue(item?.slide1.contentCarousel);

        this.userProfile
            .get('slide2.titleCarousel')
            .setValue(item?.slide2.titleCarousel);
        this.userProfile
            .get('slide2.desCarousel')
            .setValue(item?.slide2.desCarousel);
        this.userProfile
            .get('slide2.contentCarousel')
            .setValue(item?.slide2.contentCarousel);

        this.userProfile.get('title').setValue(item.title);
        this.userProfile.get('id').setValue(item.id);
    }
    // onSelectId(id){

    //   this.userProfile.get('parentid').setValue(id);
    // }
    resetForm() {
        this.userProfile = this.fb.group({
            title: [''],
            id:[''],
            content1: [''],
            slide1: this.fb.group({
                titleCarousel: [''],
                desCarousel: [''],
                contentCarousel: [''],
            }),
            slide2: this.fb.group({
                titleCarousel: [''],
                desCarousel: [''],
                contentCarousel: [''],
            }),
            content2: [''],
        });
    }
    ngOnInit(): void {
        this.resetForm();
        this.themeService.getTheme();

        this.themeService.themes$.subscribe((themes) => {
            this.themes = themes;
        });
    }
}
