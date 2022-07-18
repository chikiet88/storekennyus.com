import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DanhmucService } from '../danhmuc/danhmuc.service';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
import { ThuonghieuService } from '../thuonghieu/thuonghieu.service';
import { ProductListService } from '../product-list/product-list.service';
import { take } from 'rxjs';
import { HomeService } from '../home.service';
import { BlogService } from '../blog/blog.service';
import { CartPopupService } from '../components/cart-popup/cart-popup.service';
import { log } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { gsap } from 'gsap';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit, AfterViewInit {
    private readonly notifier: NotifierService;
    sanphamdaxem: any[] = []
    danhmuc: any[];
    products: any[];
    moreLove: any[];
    danhmucPopular: any[];
    sanphamnoibat: any[];
    thuonghieu: any[];
    combo: any[];
    danhmucBestSeller: any[];
    config;
    config1;
    cauhinh;
    tintuc: any[];
    productFlashSale: any[];
    itemThuonghieu;
    itemDanhmuc;
    isFlashSale = false;
    Color1
    Color2
    Color3
    Color4
    Color5
    constructor(
        private _productListService: ProductListService,
        private _thuonghieuService: ThuonghieuService,
        private _homeService: HomeService,
        private _blogService: BlogService,
        private _cartService: CartPopupService,
        private _route: ActivatedRoute,
        private _router: Router,
        notifierService: NotifierService
    ) {
        this.notifier = notifierService;
    }

    ngOnInit(): void {
        localStorage.setItem('thuonghieu', JSON.stringify(''));
        this.sanphamdaxem = JSON.parse(localStorage.getItem("sanphamdaxem")) || [];
       
        this.config1 = {
            loop: true,

            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                760: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                },

                982: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        };
        this.config = {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },

                982: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            },

            freeMode: true,
        };
        this._thuonghieuService.thuonghieus$.subscribe(
            (res) => (this.thuonghieu = res)
        );
        this._productListService.danhmuc$.subscribe((res) => {
            this.danhmuc = res?.filter((x) => x.pid == '');
            // this.danhmucPopular = res?.filter((x) => x.Type == 'Popular');
            // this.danhmucBestSeller = res?.filter((x) => x.Type == 'Seller');
        });
        this._productListService.products$.subscribe((res) => {
            this.productFlashSale = res.filter((x) => x.Trangthai == 1);

            this.sanphamnoibat = res?.filter((x) => {
                return x.Type == 'Featured';
            });
            // Danh mục nổi bật trang chủ
            this.danhmucPopular?.forEach((x) => {
                x.products = [];

                for (let i = 0; i <= res.length; i++) {
                    if (x.id == res[i]?.idDM) {
                        x.products.push(res[i]);
                    }
                }
                return x;
            });

            this.danhmucBestSeller = res?.filter((x) => x.Type == 'bestseller');
            
            this.combo = res?.filter((x) => x.Type == 'combo');
            // danh mục bán chạy trang chủ
            // this.danhmucBestSeller?.forEach((x) => {
            //   x.products = [];

            //   for (let i = 0; i <= res.length; i++) {
            //     if (x.id == res[i]?.idDM) {
            //       x.products.push(res[i]);
            //     }
            //   }
            //   return x;
            // });
        });
        this._homeService.getCauhinh().subscribe();
        this._homeService.cauhinh$.subscribe((res) => {
            this.cauhinh = res[0];
            this.cauhinh.data.date;
          
            this.Color1 = `background-color: ${this.cauhinh.data.Color1}`
            this.Color2 = `background-color: ${this.cauhinh.data.Color2}`
            this.Color3 = `background-color: ${this.cauhinh.data.Color3}`
            this.Color4 = `background-color: ${this.cauhinh.data.Color4}`
            this.Color5 = `background-color: ${this.cauhinh.data.Color5}`

        });
        this._blogService.getTintuc().subscribe();
        this._blogService.tintucs$.subscribe((res) => {
            this.tintuc = res?.filter((x) => x.Loaibaiviet == 1);
        });
    }
    currentDate: any;
    targetDate: any;
    cDateMillisecs: any;
    tDateMillisecs: any;
    difference: any;
    seconds: any;
    minutes: any;
    hours: any;
    days: any;
    year: number = 2023;
    month: number = 6;
    months = [
        'Jan',
        'Feb',
        'Mar',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ];
    day: number = 31;

    myTimer() {
        this.currentDate = new Date();
        this.currentDate;
        this.targetDate = new Date(this.cauhinh.data.date);
        if (this.currentDate.getTime() > this.targetDate.getTime()) {
            this.isFlashSale = false;
        } else {
            this.isFlashSale = true;
        }

        this.cDateMillisecs = this.currentDate.getTime();
        this.tDateMillisecs = this.targetDate.getTime();
        this.difference = this.tDateMillisecs - this.cDateMillisecs;
        this.seconds = Math.floor(this.difference / 1000);
        this.minutes = Math.floor(this.seconds / 60);
        this.hours = Math.floor(this.minutes / 60);
        this.days = Math.floor(this.hours / 24);

        this.hours %= 24;
        this.minutes %= 60;
        this.seconds %= 60;
        this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
        this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
        this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

        let a = document.getElementById('days');
        if (a != null) {
            document.getElementById('days').innerText = this?.days;
            document.getElementById('hours').innerText = this?.hours;
            document.getElementById('mins').innerText = this?.minutes;
            document.getElementById('seconds').innerText = this?.seconds;
        }

        setInterval(() => this.myTimer(), 1000);
    }
    ngAfterViewInit() {
        this.myTimer();
    }
    addtocart(item) {
        this._cartService.pushCart(item).subscribe((res) => {
            this.notifier.notify('success', 'Thêm sản phẩm thành công');
        });
    }
    getThuonghieu(item) {
        this.itemThuonghieu = item;
        localStorage.setItem('thuonghieu', JSON.stringify(item.id));
        
    }
    getDanhmuc(item) {
        this.itemDanhmuc = item;
    }
    searchProduct() {
        if(this.itemDanhmuc== null && this.itemThuonghieu != ""){
            let redirectURL =
                this._route.snapshot.queryParamMap.get('redirectURL') ||
                `/sanpham`;

            this._router.navigateByUrl(redirectURL);
        }
        if(this.itemDanhmuc && this.itemThuonghieu == null){
            let redirectURL =
                this._route.snapshot.queryParamMap.get('redirectURL') ||
                `/sanpham/${this.itemDanhmuc.id}`;

            this._router.navigateByUrl(redirectURL);
        }
        if (this.itemDanhmuc && this.itemThuonghieu) {
            let redirectURL =
                this._route.snapshot.queryParamMap.get('redirectURL') ||
                `/sanpham/${this.itemDanhmuc.id}`;

            this._router.navigateByUrl(redirectURL);
        }
    }
}
