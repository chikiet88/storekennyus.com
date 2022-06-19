import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductListService } from "../../product-list/product-list.service";
import { BlogService } from "../blog.service";
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from "swiper";

SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.scss"],
})
export class BlogDetailComponent implements OnInit {
  products = [];
  config;
  baiviet;
  constructor(
    private _sanphamService: ProductListService,
    private _blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get("id");

    this._sanphamService.getProduct().subscribe();
    this._sanphamService.products$.subscribe((res) => {
      this.products = res?.filter((res) => res.Type == "Featured");
    });
    this._blogService
      .getTintucChitiet(slug)
      .subscribe((res) => (this.baiviet = res));
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
