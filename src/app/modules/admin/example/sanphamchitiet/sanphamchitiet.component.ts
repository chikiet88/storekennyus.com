import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { SanphamchitietService } from './sanphamchitiet.service';
import ClassicEditor from 'ckeditor5/build/ckEditor';
import { MyUploadAdapter } from '../MyUploadAdapter';
import { map } from 'rxjs';

@Component({
    selector: 'app-sanphamchitiet',
    templateUrl: './sanphamchitiet.component.html',
    styleUrls: ['./sanphamchitiet.component.scss'],
})
export class SanphamchitietComponent implements OnInit {
    fileUploads?: any[];
    public html: string;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    inforImage: any;
    themes: any[];
    theme: any;
    message: 'chon theme';
    userProfile: FormGroup;
    selectTheme: any;
    menu: any[];
    loader;
    idSelect;
    thumb;
    public Editor: ClassicEditor;

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

    public componentEvents: string[] = [];
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
    }

    constructor(
        private _sanphamchitietService: SanphamchitietService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
        this.html = '';
        this.Editor = ClassicEditor;
    }
    onSubmit() {
        this._sanphamchitietService
            .postSanphamchitiet(this.userProfile.value)
            .subscribe((res) => alert('Tạo nội dung thành công'));
    }
    onSelect(item) {
        this.userProfile.get('content').setValue(item.content);
        this.userProfile.get('title').setValue(item.title);
    }

    onSelectSanphamchitiet(item) {
        //   this.userProfile.get('content').setValue(item.content);
        //   this.userProfile.get('des').setValue(item.des);
        //   this.userProfile.get('title').setValue(item.title);
        //   this.userProfile.addControl('id', new FormControl(item.id));
        //   this.userProfile.get('id').setValue(item.id);
        //   this.userProfile.get('slug').setValue(item.slug);
        //   this.userProfile.get('Loaibaiviet').setValue(item.Loaibaiviet);
        //   this.userProfile.get('thumbimage').setValue(item.thumbimage);

        this.idSelect = item.id;
        this.thumb = item.thumbimage;
    }
    deleteSanphamchitiet() {
        alert('Xóa bài thành công');
        this._sanphamchitietService
            .deleteSanphamchitiet(this.idSelect)
            .subscribe();
    }
    updateSanphamchitiet() {
        alert('Cập nhật thành công');

        this._sanphamchitietService
            .updateSanphamchitiet(this.userProfile.value)
            .subscribe();
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    public onReady(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            console.log(loader);

            return new MyUploadAdapter(loader, this.uploadService);
        };

        editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
    }
    resetForm() {
        this.userProfile = this.fb.group({
            gioithieu: [''],
            thanhphan: [''],
            hieuqua: [''],
            cachsudung: [''],
            idProduct: [0],
        });
    }
    ngOnInit(): void {
        // this._sanphamchitietService.getTheme().subscribe();

        // this._sanphamchitietService.themes$.subscribe((themes) => {
        //     return (this.themes = themes);
        // });
        this.resetForm();

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
                this.fileUploads = fileUploads.reverse();
                // console.log(fileUploads);
            });
        this.uploadService._thumb$.subscribe((res) => {
            if (res) {
                this.userProfile.get('thumbimage').setValue(res);
            }
        });
    }
}
