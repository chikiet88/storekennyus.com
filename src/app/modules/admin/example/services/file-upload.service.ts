import { Injectable } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    currentFileUpload;
    percentage;
    // private basePath = '/uploads';
    private basePath = '/test';
    private _thumb: BehaviorSubject<any | null> = new BehaviorSubject(null);
    get _thumb$(): Observable<any> {
        return this._thumb.asObservable();
    }
    constructor(
        private db: AngularFireDatabase,
        private storage: AngularFireStorage
    ) {}
    pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
        const filePath = `${this.basePath}/${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);

        const uploadTask = this.storage.upload(filePath, fileUpload.file);
        uploadTask
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL().subscribe((downloadURL) => {
                        if (downloadURL) {
                            fileUpload.url = downloadURL;
                            fileUpload.name = fileUpload.file.name;
                            this.saveFileData(fileUpload);
                        }
                    });
                })
            )
            .subscribe();

        return uploadTask.percentageChanges();
    }
    private saveFileData(fileUpload: FileUpload): void {
        let image;
        this.db
            .list(this.basePath)
            .push(fileUpload)
            .then((x) => {
                this.getFiles(1) //lấy file  chứa key từ firebase về
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
                        fileUploads = fileUploads.reverse();
                        // image = fileUploads[0].url
                        //  this.myUploadAdapter.upload(fileUploads)
                        this._thumb.next(fileUploads[0]);
                    });
            });

        return image;
    }
    getFiles(numberItems: number): AngularFireList<FileUpload> {
        return this.db.list(this.basePath, (ref) => {
            return ref.limitToLast(numberItems);
        });
    }
    deleteFile(item): void {
        console.log(item);
        
        this.deleteFileDatabase(item[2])
            .then(() => {
                // this.deleteFileStorage(item[0]);
            })
            .catch((error) => console.log(error));
    }
    private deleteFileDatabase(key: string): Promise<void> {
        return this.db.list(this.basePath).remove(key);
    }
    getValueByKey(key: string):Observable<any> {
        return this.db.list(this.basePath + `/${key}`).valueChanges();
    }
    private deleteFileStorage(name: string): void {
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
    }
}
