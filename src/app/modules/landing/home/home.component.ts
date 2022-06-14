import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProductListService } from "./product-list/product-list.service";
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from "swiper";
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
  selector: "landing-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],

  encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent implements OnInit {
  isShowLogin = false
  isShowCart = false;
  isShowMenuHome = false;
  isShowMenuBrand = false;
  panelOpenState = false;

  danhmuc: any[];
  config;
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
  constructor(private _productListService: ProductListService) {}
  ngOnInit(): void {
    this._productListService.getDanhmuc().subscribe();
    this._productListService.danhmuc$.subscribe((res) => {
      this.danhmuc = this.nest(res);
      console.log(this.danhmuc);
      
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
  }
}
