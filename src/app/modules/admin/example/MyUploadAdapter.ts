import { FileUploadService } from './services/file-upload.service';
import { FileUpload } from './models/file-upload.model';
import { map } from 'rxjs';

export class MyUploadAdapter {
    public loader: any;
    public uploadService;
    public url: string;
    public xhr: any;
    inforImage: any;
    percentage = 0;
    temp;
    currentFileUpload?: FileUpload;

    constructor(loader: any, uploadService) {
        this.loader = loader;
        this.uploadService = uploadService;
        // change "environment.BASE_URL" key and API path
        this.url = `http://localhost:3000/image`;

        // change "token" value with your token
    }

    upload(url) {
        return new Promise(async (resolve, reject) => {
            this.loader.file.then((file: any) => {
                this.currentFileUpload = new FileUpload(file);

                this._initListeners(resolve, reject, this.currentFileUpload);

                //Lấy hình ảnh từ firebase về
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
    }

    _initListeners(resolve: any, reject: any, file: any) {
        // const xhr = this.xhr;

        // const loader = this.loader;
        // const genericErrorText = "Couldn't upload file:" + ` ${file?.name}.`;

        // xhr.addEventListener('error', () => reject(genericErrorText));
        // xhr.addEventListener('abort', () => reject());

        // xhr.addEventListener('load', () => {
        //     const response = xhr.response;
        //     if (!response || response.error) {
        //         return reject(
        //             response && response.error
        //                 ? response.error.message
        //                 : genericErrorText
        //         );
        //     }

        //     resolve({
        //         default: file.url,
        //     });
        // });

        // if (xhr.upload) {
        //     xhr.upload.addEventListener('progress', (evt: any) => {
        //         if (evt.lengthComputable) {
        //             loader.uploadTotal = evt.total;
        //             loader.uploaded = evt.loaded;
        //         }
        //     });
        // }
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
            (percentage) => {
                console.log(percentage);

                this.percentage = Math.round(percentage ? percentage : 0);
                if (this.percentage == 100) {
                    this.uploadService._thumb$.subscribe((res) => {
                        console.log(res);
                        if (res != null) {
                            this.temp = res;
                            setTimeout(() => {
                                resolve({
                                    default: this.temp?.url,
                                });
                            }, 1000);
                        }
                    });
                }
            },
            (error) => {
                console.log(error);
            }
        );
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
