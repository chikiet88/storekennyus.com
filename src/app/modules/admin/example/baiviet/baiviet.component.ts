import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import ClassicEditor from 'ckeditor5/build/ckEditor';

import { FileUploadService } from '../services/file-upload.service';
import { BaivietService } from './baiviet.service';
import { map } from 'rxjs';
import { MyUploadAdapter } from '../MyUploadAdapter';

@Component({
    selector: 'app-baiviet',
    templateUrl: './baiviet.component.html',
    styleUrls: ['./baiviet.component.scss'],
})
export class BaivietComponent implements OnInit {
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
    courses: any;
    public Editor: ClassicEditor;
    BACK_END_MAPPING_URL_FOR_SAVE_IMG: string =
        'gs://timona-9c284.appspot.com/uploads-tazaskin';

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
        private baivietService: BaivietService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
        this.html = '';
        this.Editor = ClassicEditor;
    }
    onSubmit() {
        this.baivietService.postCourse(this.userProfile.value).subscribe();
        alert('Tạo nội dung thành công');
    }
    onSelect(item) {
        this.userProfile.get('content').setValue(item.content);
        this.userProfile.get('title').setValue(item.title);
    }
    onSelectId(id) {
        console.log(id);

        this.userProfile.addControl('parentid', new FormControl(id));
        this.userProfile.get('parentid').setValue(id);
        this.baivietService.courses$
            .pipe(
                map((arr) => {
                    if (arr.length > 0) {
                        return arr.filter((r) => r.parentid == id);
                    } else if (arr.length == 0) {
                        return undefined;
                    }
                })
            )
            .subscribe((result) => {
                console.log(result);

                this.courses = result;
            });
    }

    onSelectBaiviet(item) {
        this.userProfile.get('content').setValue(item.content);
        this.userProfile.get('des').setValue(item.des);
        this.userProfile.get('title').setValue(item.title);
        this.userProfile.addControl('id', new FormControl(item.id));
        this.userProfile.get('id').setValue(item.id);
        this.userProfile.get('slug').setValue(item.slug);
        this.userProfile.get('Loaibaiviet').setValue(item.Loaibaiviet);
        this.userProfile.get('thumbimage').setValue(item.thumbimage);

        this.idSelect = item.id;
        this.thumb = item.thumbimage;
    }
    deleteBaiviet() {
        alert('Xóa bài thành công');
        this.baivietService.deleteBaiviet(this.idSelect).subscribe();
    }
    updateBaiviet() {
        alert('Cập nhật thành công');

        this.baivietService.updateBaiviet(this.userProfile.value).subscribe();
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    deleteFileUpload(fileUpload: FileUpload): void {
        console.log(fileUpload);

        this.uploadService.deleteFile(fileUpload);
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

    ngOnInit(): void {
        this.userProfile = this.fb.group({
            title: [''],
            des: [''],
            content: [''],
            slug: [''],
            Loaibaiviet: [0],
            thumbimage: [''],
        });
        this.baivietService.getTheme().subscribe();

        this.baivietService.themes$.subscribe((themes) => {
            return (this.themes = themes);
        });
        this.baivietService.getMenu().subscribe();
        this.baivietService.menu$
            .pipe(
                map(
                    (arr) =>
                        arr && arr.length && arr.filter((r) => r.parentid != '')
                )
            )
            .subscribe((result) => (this.menu = result));

        this.baivietService.getBaiviet().subscribe();
        this.baivietService.courses$.subscribe((courses) => {
            this.courses = courses;
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
