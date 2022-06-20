import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CartPopupService } from "../components/cart-popup/cart-popup.service";
import { CheckoutService } from "./checkout.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  carts: any[];
  amount: number;
  khachhangForm: FormGroup;

  constructor(private cartService: CartPopupService, private fb: FormBuilder, private _donhangService : CheckoutService) {}
  resetForm() {
    this.khachhangForm = this.fb.group({
      hoten: [""],
      phone: [0],
      email: [""],
      diachi:[""],
      ghichu:[''],
      idP:[0],
      idUser:[],
      soluong:[0],
      Giatien:[0],


    });
  }
  ngOnInit(): void {
    this.resetForm()
    this.cartService.getCart().subscribe();
    this.cartService.carts$.subscribe((res) => {
      console.log(res);
      
      this.carts = res;
    });
    this.cartService.amount$.subscribe((res) => (this.amount = res));
  }
  
  datHang(){
    this.carts.forEach(x=>{
      this.khachhangForm.get('idP').setValue(x.id)
      this.khachhangForm.get('soluong').setValue(x.cartNum)
      this.khachhangForm.get('Giatien').setValue(x.Gia)

    this._donhangService.postdonhang(this.khachhangForm.value).subscribe(res=>{
      alert('Đặt hàng thành công')
      this.carts.forEach(x=>{
        this.cartService.removeCart(x).subscribe()
      })
    })

    })
  }
}
