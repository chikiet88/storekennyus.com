import { Route } from "@angular/router";
import { LandingHomeComponent } from "app/modules/landing/home/home.component";
import { GioithieuComponent } from "./gioithieu/gioithieu.component";
import { DanhmucComponent } from "./danhmuc/danhmuc.component";
import { ContactComponent } from "./contact/contact.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { BlogComponent } from "./blog/blog.component";
import { BlogDetailComponent } from "./blog/blog-detail/blog-detail.component";
import { CartComponent } from "./cart/cart.component";
import { SigninComponent } from "./signin/signin.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { CheckoutDetailComponent } from "./checkout-detail/checkout-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProductDetailComponent } from "./product-list/product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { BlogListComponent } from "./blog/blog-list/blog-list.component";
import { SanphamDanhmucComponent } from "./product-list/sanpham-danhmuc/sanpham-danhmuc.component";

export const landingHomeRoutes: Route[] = [
  {
    path: "",
    component: LandingHomeComponent,
    children: [
      { path: "", component: HomepageComponent },
      { path: "danhmuc", component: DanhmucComponent },
      { path: "gioithieu", component: GioithieuComponent },
      { path: "lienhe", component: ContactComponent },
      { path: "sanpham", component: ProductListComponent },
      { path: "sanpham/:id", component: ProductDetailComponent },
      { path: "wishlist", component: WishlistComponent },
      {
        path: "tintuc",
        component: BlogComponent,
        children: [
          {
            path: "",
            component: BlogListComponent,
            children: [],
          },
          { path: ":id", component: BlogDetailComponent },
        ],
      },
      { path: "cart", component: CartComponent },
      { path: "signin", component: SigninComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "checkout/:slug", component: CheckoutDetailComponent },
      { path: "profile", component: ProfileComponent },
      { path: "san-pham-da-xem", component: SanphamDanhmucComponent },
    ],
  },
];
