import { AfterViewInit, Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
import { ThuonghieuService } from './thuonghieu/thuonghieu.service';
import { HomeService } from './home.service';
import { ProductListService } from './product-list/product-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinginService } from './signin/singin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { log } from 'console';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],

    encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent implements OnInit, AfterViewInit{
    isShowLogin = false;
    isShow = true;
    num;
    isShowCart = false;
    isShowMenuHome = false;
    isShowMenuBrand = false;
    panelOpenState = false;
    MenuActive = true;
    i = 0
    DanhmucActive = false;
    isLogin = false;
    danhmuc: any[];
    danhmucChild: any[] = [];
    thuonghieus: any[];
    categories: any[];
    token = localStorage.getItem('accessToken');
    products: any[];
    productSearch: any[];
    signInForm: FormGroup;
    cauhinh: any;
    searchText: string;
    user;
    sanphamdanhmuc:any [] = []
    danhmucSearch;
    config;
    menu;
    timedOutCloser;
    productSearchPopup = false;
    danhmucArr: any[] = [];
    /**
     * Constructor
     */
    constructor(
        private _productListService: ProductListService,
        private _thuonghieuService: ThuonghieuService,
        private _menuService: HomeService,
        private _formBuilder: FormBuilder,
        private _signinService: SinginService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}
    nest = (items, id = '', link = 'pid') => {
        if (items) {
            return items
                .filter((item) => item[link] == id)
                .map((item) => ({
                    ...item,
                    children: this.nest(items, item.id),
                }));
        }
    };

    toggleMenu() {
        this.timedOutCloser = setTimeout(() => {
            this.isShow = !this.isShow;
        }, 150);
    }
    searchSanpham() {
        if (this.searchText != '') {
            this.searchText = this.searchText.toLocaleLowerCase();
            this.productSearch = this.products.filter((x) => {
                if (x.id == this.danhmucSearch?.id) {
                    x.tenDm = this.danhmucSearch?.Tieude;
                    return x.Tieude.toLocaleLowerCase().includes(
                        this.searchText
                    );
                } else {
                    return x.Tieude.toLocaleLowerCase().includes(
                        this.searchText
                    );
                }
            });
            this.productSearchPopup = true;

            for (let i = 0; i < this.productSearch.length; i++) {
                for (let j = 0; j < this.categories.length; j++) {
                    if (this.productSearch[i].idDM == this.categories[j].id) {
                        this.productSearch[i].tenDm = this.categories[j].Tieude;
                    }
                }
            }
        }
    }
    selectCategoriesSearch(item) {
        this.danhmucSearch = item;
    }
    selectDanhmuc(i) {
      this.i = i
        this.danhmucChild = this.danhmucArr[i];
    }
    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }
        this._signinService.signIn(this.signInForm.value).subscribe(
            (data) => {
                this.isLogin = true;
                this.user = data.user;

                const redirectURL =
                    this._route.snapshot.queryParamMap.get('redirectURL') ||
                    '/profile';

                this._router.navigateByUrl(redirectURL);
            },
            (response) => {
                console.log(response);

                // Re-enable the form
                // this.signInForm.enable();
                // this.signInNgForm.resetForm();
            }
        );
    }
    ngAfterViewInit(): void {
      
    }
    signout() {
        this._signinService.signOut().subscribe((res) => {
            if (res == true) {
                this.isLogin = false;
            }
        });
    }
    ngOnInit(): void {
        this.num =
            JSON.parse(localStorage.getItem('sanphamdaxem'))?.length || 0;
        this._productListService.getProduct().subscribe();
        this._productListService.products$.subscribe(
            (res) => {
              (this.products = res)
              this.sanphamdanhmuc = res?.filter(x=> x.Type == 'danhmucnoibat')
            }
        );
        this._productListService.getDanhmuc().pipe(take(1)).subscribe();
        this._productListService.danhmuc$.subscribe((res) => {
            this.categories = res;
            this.danhmuc = res
            if (this.products?.length > 0) {
                this.sanphamdanhmuc.filter((x) => {
                    this.danhmuc?.forEach((v) => {
                        if (x.idDM == v.id ) {
                            v.sanphamnoibat = x;
                            console.log(v);
                        } else {
                            return;
                        }
                    });
                });
            }
            this.danhmuc = this.nest(res);

            if (this.danhmuc?.length > 0) {
                for (let i = 0; i < this.danhmuc.length; i++) {
                    this.danhmucArr.push(this.danhmuc[i].children);
                }
                this.danhmucChild = this.danhmucArr[0];
            }
        });

        this.signInForm = this._formBuilder.group({
            SDT: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [''],
        });
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
        this._thuonghieuService.getThuonghieu().subscribe();
        this._thuonghieuService.thuonghieus$.subscribe((res) => {
            this.thuonghieus = res?.filter((x) => x.Trangthai == 1);
        });
        this._menuService.getMenu().subscribe();
        this._menuService.menu$.subscribe((res) => {
            this.menu = res;
        });
        this._menuService.getCauhinh().subscribe();
        this._menuService.cauhinh$.subscribe((res) => {
            if (res) {
                this.cauhinh = res[0];
            }
        });
        this._signinService.signInUsingToken(this.token).subscribe((res) => {
            this.isLogin = res;
            if (res == true) {
                this._signinService.get().subscribe();
                this._signinService.user$.subscribe((res) => {
                    this.user = res;
                    console.log(this.user);
                });
            }
        });
        // this._signinService.get().subscribe((res) =>  this.user = res);
    }
}
