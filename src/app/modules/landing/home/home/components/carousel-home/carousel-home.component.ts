import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from "swiper";

SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.scss']
})
export class CarouselHomeComponent implements OnInit {
  config
  constructor() { }

  ngOnInit(): void {
    this.config = {
      loop: true,
      speed:1000,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
   
    };
  }

}
