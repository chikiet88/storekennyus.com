import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { FileUpload } from '../../models/file-upload.model';
import { MyUploadAdapter } from '../../MyUploadAdapter';
import { FileUploadService } from '../../services/file-upload.service';
import { ThemesanphamchitietService } from './themesanphamchitiet.service';
import ClassicEditor from 'ckeditor5/build/ckEditor';

@Component({
    selector: 'app-themesanphamchitiet',
    templateUrl: './themesanphamchitiet.component.html',
    styleUrls: ['./themesanphamchitiet.component.scss'],
})
export class ThemesanphamchitietComponent implements OnInit {
    fileUploads?: any[];
    public html: string;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    inforImage: any;
    products: any[];
    themes: any[];
    theme: any;
    message: 'chon theme';
    themeSanphamchitietForm: FormGroup;
    selectTheme: any;
    menu: any[];
    loader;
    idSelect;
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
        private _themeSanphamchitietService: ThemesanphamchitietService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
        this.html = '';
        this.Editor = ClassicEditor;
    }
    onSubmit() {
        this.themeSanphamchitietForm.removeControl('id');
        this._themeSanphamchitietService
            .postThemeSanphamchitiet(this.themeSanphamchitietForm.value)
            .subscribe((res) => alert('Tạo nội dung thành công'));

        this.resetForm();
    }

    onSelectThemeSanphamchitiet(item) {
        this.themeSanphamchitietForm.get('name').setValue(item.name);
        this.themeSanphamchitietForm.get('gioithieu').setValue(item.gioithieu);
        this.themeSanphamchitietForm.get('thanhphan').setValue(item.thanhphan);
        this.themeSanphamchitietForm.addControl('id', new FormControl(item.id));
        this.themeSanphamchitietForm.get('id').setValue(item.id);
    }
    deleteThemeSanphamchitiet() {
        alert('Xóa bài thành công');
        this._themeSanphamchitietService
            .deleteThemeSanphamchitiet(this.idSelect)
            .subscribe();
        this.resetForm();
    }
    updateThemeSanphamchitiet() {
        alert('Cập nhật thành công');

        this._themeSanphamchitietService
            .updateThemeSanphamchitiet(this.themeSanphamchitietForm.value)
            .subscribe();
        this.resetForm();
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
        this.themeSanphamchitietForm = this.fb.group({
            name: [''],
            gioithieu: [''],
            thanhphan: [''],
        });
    }
    ngOnInit(): void {
        this.resetForm();
        // this._themeSanphamchitietService.getTheme().subscribe();

        // this._themeSanphamchitietService.themes$.subscribe((themes) => {
        //     return (this.themes = themes);
        // });
        this._themeSanphamchitietService.getThemeSanphamchitiet().subscribe();
        this._themeSanphamchitietService.themes$.subscribe(
            (res) => (this.themes = res)
        );
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
                this.themeSanphamchitietForm.get('thumbimage').setValue(res);
            }
        });
    }
}
