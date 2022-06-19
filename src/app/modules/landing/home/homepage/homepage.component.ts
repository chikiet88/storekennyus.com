import { Component, OnInit } from "@angular/core";
import { DanhmucService } from "../danhmuc/danhmuc.service";
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from "swiper";
import { ThuonghieuService } from "../thuonghieu/thuonghieu.service";
import { ProductListService } from "../product-list/product-list.service";
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  danhmuc: any[];
  products: any[];
  moreLove: any[];
  danhmucPopular: any[];
  sanphamnoibat: any[];
  danhmucBestSeller: any[];
  config;
  constructor(
    private _productListService: ProductListService,
    private _thuonghieuService: ThuonghieuService
  ) {}

  ngOnInit(): void {
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
    this._productListService.getDanhmuc().subscribe();
    this._productListService.danhmuc$.subscribe((res) => {
      this.danhmuc = res;
      this.danhmucPopular = res?.filter((x) => x.Type == "Popular");
      this.danhmucBestSeller = res?.filter((x) => x.Type == "Seller");
    });
    this._productListService.getProduct().subscribe();
    this._productListService.products$.subscribe((res) => {
      this.moreLove = res?.filter((x) => {
        return x.Type == "More to love";
      });
      this.sanphamnoibat = res?.filter((x) => {
        return x.Type == "Featured";
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

      // danh mục bán chạy trang chủ
      this.danhmucBestSeller?.forEach((x) => {
        x.products = [];

        for (let i = 0; i <= res.length; i++) {
          if (x.id == res[i]?.idDM) {
            x.products.push(res[i]);
          }
        }
        return x;
      });

    });
  }
}
