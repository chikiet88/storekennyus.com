import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CartPopupService } from "../components/cart-popup/cart-popup.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  carts: any[];
  amount: number;
  khachhangForm: FormGroup;

  constructor(private cartService: CartPopupService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe();
    this.cartService.carts$.subscribe((res) => {
      this.carts = res;
    });
    this.cartService.amount$.subscribe((res) => (this.amount = res));
  }
  resetForm() {
    this.khachhangForm = this.fb.group({
      Hoten: [""],
      phone: [0],
      email: [""],
      diachi:[""],
      ghichu:[''],
    });
  }
}
