import {
    AfterViewInit,
    Component,
    DoCheck,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
import { HomeService } from '../../home.service';
import { FileUploadService } from '../../services/file-upload.service';
import gsap from 'gsap';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
    selector: 'app-carousel-home',
    templateUrl: './carousel-home.component.html',
    styleUrls: ['./carousel-home.component.scss'],
})
export class CarouselHomeComponent implements OnInit, AfterViewInit, DoCheck {
    @ViewChild('animeObject') AnimationObject: ElementRef;
    config;
    listimage: any[] = [];
    constructor(
        private _homeService: HomeService,
        private _uploadService: FileUploadService
    ) {}
    cauhinh;
    callback(item) {
        return new Promise((resolve, reject) => {
            this._uploadService
                .getValueByKey(item)
                .pipe(take(1))
                .subscribe((data) => {
                    resolve(data[1]);
                });
        });
    }
    ngOnInit(): void {
        this.config = {
            loop: true,
            speed: 1000,
        };
        this._homeService.getCauhinh().subscribe();
        this._homeService.cauhinh$.pipe(take(1)).subscribe((res) => {
            console.log(res[0].data.imageCarousel);
            if (res) {
                for (
                    let i = 0, p = Promise.resolve();
                    i < Object.keys(res[0].data.imageCarousel).length;
                    i++
                ) {
                    p = p.then(() =>
                        this.callback(
                            Object.values(res[0].data.imageCarousel)[i]
                        ).then((x) => {
                            this.listimage.push(x);
                            console.log(this.listimage);
                        })
                    );
                }
            }
        });
    }
    ngDoCheck(): void {
        document
            .querySelector('.swiper-button-prev')
            .addEventListener('click', function () {
                console.log('sss');

                gsap.from('.image-1', {
                    x: 200,
                    duration: 1,
                    delay: 1,
                    opacity: 0,
                    ease: 'bounce',
                });
                gsap.from('.image-2', {
                    x: 200,
                    duration: 1,
                    delay: 1,
                    opacity: 0,
                    ease: 'bounce',
                });
            });
    }
    ngAfterViewInit(): void {
        gsap.from('.image-1', {
            x: 200,
            duration: 1,
            delay: 1,
            opacity: 0,
            ease: 'bounce',
        });
        gsap.from('.image-2', {
            x: 200,
            duration: 1,
            delay: 1,
            opacity: 0,
            ease: 'bounce',
        });
    }
}
