// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { AddBaivietService } from './add-baiviet.service';
// import * as customBuild from '../../ckCustomBuild/build/ckEditor';
// import { Khoahoc } from '../theme/theme.types';
// import { map } from 'rxjs';
// import { FileUpload } from '../models/file-upload.model';
// import { FileUploadService } from '../services/file-upload.service';
// import { MyUploadAdapter } from '../MyUploadAdapter';
// import { DanhmucService } from '../danhmuc/danhmuc.service';

// @Component({
//     selector: 'app-add-baiviet',
//     templateUrl: './add-baiviet.component.html',
//     styleUrls: ['./add-baiviet.component.scss'],
// })
// export class AddBaivietComponent implements OnInit {
//     fileUploads?: any[];
//     public html: string;
//     selectedFiles?: FileList;
//     currentFileUpload?: FileUpload;
//     percentage = 0;
//     themes: any[];
//     theme: any;
//     danhmucs: any[];
//     message: 'chon theme';
//     baivietForm: FormGroup;
//     selectTheme: any;
//     menu: any[];
//     loader;
//     idSelect;
//     thumb;
//     isbaiviet; // title loại bài viết (có hoặc không)
//     courses: any;
//     formBaiviet;
//     public Editor: customBuild;
//     checklistCourse: any[] = [];
//     BACK_END_MAPPING_URL_FOR_SAVE_IMG: string =
//         'gs://timona-9c284.appspot.com/uploads';

//     public config = {
//         htmlSupport: {
//             allow: [
//                 {
//                     name: /.*/,
//                     attributes: true,
//                     classes: true,
//                 },
//             ],
//         },
//     };

//     public componentEvents: string[] = [];
//     upload(): void {
//         if (this.selectedFiles) {
//             const file: File | null = this.selectedFiles.item(0);
//             this.selectedFiles = undefined;
//             if (file) {
//                 this.currentFileUpload = new FileUpload(file);

//                 this.uploadService
//                     .pushFileToStorage(this.currentFileUpload)
//                     .subscribe(
//                         (percentage) => {
//                             this.percentage = Math.round(
//                                 percentage ? percentage : 0
//                             );
//                         },
//                         (error) => {
//                             console.log(error);
//                         }
//                     );
//             }
//         }
//     }

//     constructor(
//         private baivietService: AddBaivietService,
//         private fb: FormBuilder,
//         private uploadService: FileUploadService,
//         private _danhmucService: DanhmucService
//     ) {
//         this.html = '';
//         this.Editor = customBuild;
//     }

//     onSubmit() {
//         // console.log(this.formBaiviet);

//         this.baivietForm.removeControl('isLoaiBaiviet');
//         this.baivietService
//             .postCourse(this.baivietForm.value)
//             .subscribe((res) => {
//                 if (res) {
//                     alert('Tạo nội dung thành công');
//                 }
//             });
//     }
//     onSelectTheme(item) {
//         this.baivietForm.get('content').setValue(item.content);
//         this.baivietForm.get('title').setValue(item.title);
//     }
//     onSelectIdMenu(id) {
//         this.baivietForm.addControl('parentid', new FormControl(id));
//         this.baivietForm.get('parentid').setValue(id);
//         this.baivietService.courses$
//             .pipe(
//                 map((arr) => {
//                     if (arr.length > 0) {
//                         return arr.filter((r) => r.parentid == id);
//                     } else if (arr.length == 0) {
//                         return undefined;
//                     }
//                 })
//             )
//             .subscribe((result) => {
//                 this.courses = result;
//             });
//     }
//     getCourseList(e) {
//         console.log(e.checked);

//         let id = e.source.value.id;
//         if (e.checked == true) {
//             this.checklistCourse.push(id);
//         } else if (e.checked == false) {
//             console.log(id);

//             this.checklistCourse = this.checklistCourse.filter((x) => {
//                 return x != id;
//             });
//             console.log(this.checklistCourse);
//         }
//     }
//     onSelectBaiviet(item) {
//         // this.formBaiviet.content = item.content
//         // this.formBaiviet.des = item.des
//         // this.formBaiviet.title = item.title
//         // this.formBaiviet.id = item.id
//         // this.formBaiviet.des = item.des
//         // this.formBaiviet.idDM = item.idDM
//         // this.formBaiviet.slug = item.slug
//         // this.formBaiviet.Loaibaiviet = item.Loaibaiviet
//         // this.formBaiviet.thumbimage = item.thumbimage

//         // console.log(this.formBaiviet);

//         this.baivietForm.get('content').setValue(item.content);
//         this.baivietForm.get('des').setValue(item.des);
//         this.baivietForm.get('title').setValue(item.title);
//         this.baivietForm.addControl('id', new FormControl(item.id));
//         this.baivietForm.get('id').setValue(item.id);
//         this.baivietForm.get('idDM').setValue(item.idDM);
//         this.baivietForm.get('slug').setValue(item.slug);
//         this.baivietForm.get('Loaibaiviet').setValue(item.Loaibaiviet);
//         this.baivietForm.get('thumbimage').setValue(item.thumbimage);
//         // this.baivietForm.get('checkListCourse').setValue(item.checkListCourse)
//         // console.log(item.thumbimage);
//         // this.danhmucs.find((x)=>{
//         //     if(x.i == item.idDM){
//         //     this.baivietForm.get('tenDM').setValue(x.title);
                
//         //     }
//         // })
//         // if (item.Loaibaiviet == 1) {
//         //     console.log(item.Loaibaiviet);
            
//         //     this.baivietForm.get('isNoibat').setValue('Có');
//         //     console.log(this.baivietForm.value);
            
//         // } else {
//         //     this.baivietForm.get('isNoibat').setValue('Không');
//         // }

//         this.idSelect = item.id;
//         this.thumb = item.thumbimage;
//     }
//     deleteBaiviet() {
//         this.baivietForm.removeControl('isLoaiBaiviet');

//         this.baivietService
//             .deleteBaiviet(this.idSelect)
//             .subscribe((res) => alert('Xóa bài thành công'));
//         this.resetForm();
//     }
//     updateBaiviet() {
//         this.baivietForm.removeControl('isLoaiBaiviet');
//         console.log(this.baivietForm.value);

//         this.baivietService
//             .updateBaiviet(this.baivietForm.value)
//             .subscribe((res) => alert('Cập nhật thành công'));
//         this.resetForm();
//     }

//     selectFile(event: any): void {
//         this.selectedFiles = event.target.files;
//     }
//     deleteFileUpload(fileUpload: FileUpload): void {
//         this.uploadService.deleteFile(fileUpload);
//         this.resetForm();
//     }
//     onchangeLoaibaiviet(e) {
//         this.baivietForm.get('Loaibaiviet').setValue(e);
//     }

//     resetForm() {
//         this.baivietForm = this.fb.group({
//             title: [''],
//             des: [''],
//             content: [''],
//             idDM: [0],
//             slug: [''],
//             Loaibaiviet: [0],
//             thumbimage: [''],
//             image: [''],

//             //get ten select
//             // isNoibat: [''],
//             // tenDm: [''],
//             // tenMenu: [''],
            
//             // checkListCourse:['']
//         });
//     }
//     public onReady(editor) {
//         editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//             return new MyUploadAdapter(loader, this.uploadService);
//         };

//         editor.ui
//             .getEditableElement()
//             .parentElement.insertBefore(
//                 editor.ui.view.toolbar.element,
//                 editor.ui.getEditableElement()
//             );
//     }
//     selectionDanhmuc(e) {
//         this.baivietForm.get('idDM').setValue(e);
//         this.formBaiviet.idDM = e;
//     }

//     ngOnInit(): void {
//         // this.formBaiviet = {
//         //     title: '',
//         //     des: '',
//         //     content: '',
//         //     idDM: 0,
//         //     slug: '',
//         //     Loaibaiviet: 0,
//         //     thumbimage: '',
//         //     image: '',
//         // }
//         this.resetForm();
//         this.baivietService.getTheme().subscribe();

//         this.baivietService.themes$.subscribe((themes) => {
//             console.log(themes);
            
//             return (this.themes = themes);
//         });
//         this.baivietService.getMenu().subscribe();
//         this.baivietService.menu$
//             // .pipe(
//             //     map(
//             //         (arr) =>
//             //             arr && arr.length && arr.filter((r) => r.parentid == '')
//             //     )
//             // )
//             .subscribe((result) => (this.menu = result));

//         this.baivietService.getBaiviet().subscribe();
//         this.baivietService.courses$.subscribe((courses) => {
//             this.courses = courses;
//         });
//         this._danhmucService.getDanhmuc().subscribe();
//         this._danhmucService.danhmucs$.subscribe(
//             (res) => (this.danhmucs = res)
//         );

//         this.uploadService._thumb$.subscribe((res) => {
//             if (res) {
//                 this.thumb = res.url;
//                 this.baivietForm.get('thumbimage').setValue(res.url);
//                 this.formBaiviet.thumbimage = res.url;
//             }
//         });
//     }
// }
