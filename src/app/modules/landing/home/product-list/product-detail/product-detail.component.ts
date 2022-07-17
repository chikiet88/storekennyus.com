import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    VERSION,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CartPopupService } from '../../components/cart-popup/cart-popup.service';
import { DanhmucService } from '../../danhmuc/danhmuc.service';
import { HomeService } from '../../home.service';
import { ProductListService } from '../product-list.service';
import SwiperCore, {
    Autoplay,
    FreeMode,
    Navigation,
    Pagination,
    Thumbs,
} from 'swiper';
import { FileUploadService } from '../../services/file-upload.service';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination, Autoplay]);
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
    // export class ProductDetailComponent implements OnInit {
    name = 'Angular ' + VERSION.major;
    isZoomed = false;
    pos = { top: 0, left: 0, x: 0, y: 0 };
    sanphamdaxem: any[]
    rating3;
    config1;
    config;
    thumbsSwiper: any;
    quantity: number = 1;
    product;
    products;
    cauhinh;
    listimage: any[] = [];
    danhmuc: any[];
    TenDM = [];
    productCard;
    productSale: any[] = [];
    constructor(
        private _productService: ProductListService,
        private route: ActivatedRoute,
        private _cartService: CartPopupService,
        private _danhmucService: DanhmucService,
        private _homeService: HomeService,
        private _uploadService: FileUploadService
    ) {}
    @ViewChild('container') 'container': ElementRef;
    @ViewChild('img') 'img': ElementRef;

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
        this.sanphamdaxem = JSON.parse(localStorage.getItem("sanphamdaxem")) || [];

        this.config = {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20,

                },
                760: {
                    slidesPerView: 2,
                    spaceBetween: 20,

                },
                982: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
            },
        };
        this.config1 = {
            loop: true,

            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                760: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                },

                982: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        };

        this.rating3 = 3;
        this.route.params.subscribe((slug) => {
            this._productService.getDanhmuc().subscribe();
            this._productService.danhmuc$.subscribe(
                (res) => (this.danhmuc = res)
            );
            this._danhmucService.getDanhmuc().subscribe();
            this._homeService.getCauhinh().subscribe();
            this._homeService.cauhinh$.subscribe((res) => {
                this.day = res[0].data.day;
                this.month = res[0].data.month;
                this.year = res[0].data.year;
                this.cauhinh = res[0].data.date;
                console.log(this.cauhinh);
            });
            this._productService.getProductDetail(slug.id).subscribe((res) => {
                this.listimage = [];
                this.product = res;
                if (res) {
                    this.listimage.push(this.product.Image);
                    for (
                        let i = 0, p = Promise.resolve();
                        i < Object.keys(this.product.ListImage).length;
                        i++
                    ) {
                        p = p.then(() =>
                            this.callback(
                                Object.values(this.product.ListImage)[i]
                            ).then((x) => {
                                this.listimage.push(x);
                            })
                        );
                    }

                    let arr =
                        JSON.parse(localStorage.getItem('sanphamdaxem')) || [];
                    let index = arr.findIndex((e) => e.id == this.product.id);

                    if (index === -1) {
                        localStorage.setItem(
                            'sanphamdaxem',
                            JSON.stringify([...arr, res])
                        );
                    }

                    this._productService.getProduct().subscribe();
                    this._productService.products$.subscribe((res) => {
                        this.productSale = res.filter((x) => x.Trangthai == 1);
                        this.products = res?.filter(
                            (x) =>
                                x.idDM == this.product.idDM &&
                                x.id != this.product.id
                        );
                        let productCard = res?.filter(
                            (x) => x.Type == 'danhmucnoibat'
                        );
                        this.productCard = productCard.sort(
                            () => 0.5 - Math.random()
                        );
                    });

                    this._danhmucService.danhmucs$.subscribe((res) => {
                        res?.find((x) => {
                            if (this.product?.idDM == x.id) {
                                this.product.tenDM = x.Tieude;
                            }
                        });
                        if (this.product) {
                            if (Object.keys(this.product.Tags)?.length != 0) {
                                for (const [key, value] of Object.entries(
                                    this.product.Tags
                                )) {
                                    if (res) {
                                        res.forEach((x) => {
                                            if (x.id == key) {
                                                this.TenDM.push({
                                                    id: x.id,
                                                    Tieude: x.Tieude,
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                        }
                        this.product.TenDM = this.TenDM;
                    });
                    this._cartService.getCart().subscribe((res) => {
                        res.find((x) => {
                            if (this.product.id == x.id) {
                                this.quantity = x.cartNum;
                            }
                        });
                    });
                }
            });
        });
    }
    isFlashSale = false;
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
        this.targetDate = new Date(this.cauhinh);
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

        setInterval(() => this.myTimer, 1000);
    }
    ngAfterViewInit() {
        this.myTimer();
    }

    addtocart(item) {
        if (item.GiaSale != 0) {
            item.Gia = item.GiaSale;
            this._cartService
                .pushQuantityCart(item, this.quantity)
                .subscribe((res) => {
                    alert('thêm sản phẩm thành công');
                });
        } else {
            alert('thêm sản phẩm thành công');
            this._cartService
                .pushQuantityCart(item, this.quantity)
                .subscribe((res) => alert('thêm sản phẩm thành công'));
        }
    }
    congsoluong() {
        this.quantity += 1;
    }
    trusoluong() {
        if (this.quantity > 1) {
            this.quantity -= 1;
        }
    }
    getQuantity(e) {
        console.log(e);
    }
}
