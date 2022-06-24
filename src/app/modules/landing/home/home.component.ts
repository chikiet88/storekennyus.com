import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from "swiper";
import { ThuonghieuService } from "./thuonghieu/thuonghieu.service";
import { HomeService } from "./home.service";
import { ProductListService } from "./product-list/product-list.service";
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
  selector: "landing-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],

  encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent implements OnInit {
  isShowLogin = false;
  isShow = true;
  num;
  isShowCart = false;
  isShowMenuHome = false;
  isShowMenuBrand = false;
  panelOpenState = false;
  MenuActive = true;
  DanhmucActive = false;
  danhmuc: any[];
  thuonghieus: any[];
  categories: any[];
  products: any[];
  productSearch: any[];
  searchText: string;
  danhmucSearch;
  config;
  menu;
  timedOutCloser;
  productSearchPopup = false
  /**
   * Constructor
   */
  nest = (items, id = "", link = "pid") =>
    items
      ?.filter((item) => item[link] == id)
      .map((item) => ({
        ...item,
        children: this.nest(items, item.id),
      }));
  constructor(
    private _productListService: ProductListService,
    private _thuonghieuService: ThuonghieuService,
    private _menuService: HomeService
  ) {}
  toggleMenu() {
    this.timedOutCloser = setTimeout(() => {
      this.isShow = !this.isShow;
    }, 150);
  }
  searchSanpham() {
    if (this.searchText != "") {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.productSearch = this.products.filter((x) => {
        if (x.id == this.danhmucSearch?.id) {
          x.tenDm = this.danhmucSearch?.Tieude;
          return x.Tieude.toLocaleLowerCase().includes(this.searchText);
        } else {
          return x.Tieude.toLocaleLowerCase().includes(this.searchText);
        }

      });
      this.productSearchPopup = true
      

      for (let i = 0; i < this.productSearch.length; i++) {
        for (let j = 0; j < this.categories.length; j++) {
          if (this.productSearch[i].idDM == this.categories[j].id) {
            this.productSearch[i].tenDm = this.categories[j].Tieude;
          }
        }
      }

    }
  }
  selectCategories(item) {
    this.danhmucSearch = item;
  }
  ngOnInit(): void {
    this.num = JSON.parse(localStorage.getItem("sanphamdaxem"))?.length || 0;
    this._productListService.getProduct().subscribe();
    this._productListService.products$.subscribe(
      (res) => (this.products = res)
    );
    this._productListService.getDanhmuc().subscribe();
    this._productListService.danhmuc$.subscribe((res) => {
      this.categories = res;
      console.log(res);

      this.danhmuc = this.nest(res);
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
  }
}
