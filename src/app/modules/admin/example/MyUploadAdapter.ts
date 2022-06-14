import { FileUploadService } from './services/file-upload.service';
import { FileUpload } from './models/file-upload.model';
import { map } from 'rxjs';

export class MyUploadAdapter {
    public loader: any;
    public uploadService: FileUploadService;
    public url: string;
    public xhr: any;
    inforImage: any;
    percentage = 0;
    currentFileUpload?: FileUpload;

    constructor(loader: any, uploadService: FileUploadService) {
        this.loader = loader;
        this.uploadService = uploadService;
        // change "environment.BASE_URL" key and API path
        this.url = `http://localhost:3000`;

        // change "token" value with your token
    }

    upload() {
        return new Promise(async (resolve, reject) => {
            this.loader.file.then((file: any) => {
                console.log(file);
                this.currentFileUpload = new FileUpload(file);

                //Lấy hình ảnh từ firebase về
                const promiseA = new Promise(
                    (resolutionFunc, rejectionFunc) => {
                        resolutionFunc(
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
                                )
                        );
                    }
                );
                promiseA.then(() =>
                this.uploadService.getFiles(1)

                //lấy file  chứa key từ firebase về
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
                                        
                    //  this.myUploadAdapter.upload(fileUploads)
                    this._initRequest();
                    this._initListeners(resolve, reject, fileUploads[0]);
                    this._sendRequest(fileUploads[0]);
                })
                );
            });
        });
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = (this.xhr = new XMLHttpRequest());
        xhr.open('POST', this.url, true);

        // change "Authorization" header with your header

        xhr.responseType = 'json';
        console.log(xhr);
    }

    _initListeners(resolve: any, reject: any, file: any) {
        const xhr = this.xhr;

        const loader = this.loader;
        const genericErrorText = "Couldn't upload file:" + ` ${file?.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());

        xhr.addEventListener('load', () => {
            const response = xhr.response;
            console.log(response);

            if (!response || response.error) {
                return reject(
                    response && response.error
                        ? response.error.message
                        : genericErrorText
                );
            }

            // change "response.data.fullPaths[0]" with image URL
            resolve({
                default: file.url,
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', (evt: any) => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest(file: any) {
        const data = new FormData();

        if (file) {
            data.append('key', file.key),
                data.append('name', file.name),
                data.append('url', file.url),
                this.xhr.send(data);
        }
    }
}
