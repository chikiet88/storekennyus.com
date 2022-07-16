import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CartPopupService } from '../components/cart-popup/cart-popup.service';
import { SinginService } from '../signin/singin.service';
import { CheckoutService } from './checkout.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
    private readonly notifier: NotifierService;
    token = localStorage.getItem('accessToken') || null;
    diachi
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    codeTp
    diachichitiet
    phoneRegex =
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    carts: any[];
    amount: number;
    khachhangForm: FormGroup;
    donhangForm: FormGroup;
    TenTP
    TenQuanHuyen
    phiship:number
    constructor(
        private cartService: CartPopupService,
        private fb: FormBuilder,
        private _checkoutService: CheckoutService,
        notifierService: NotifierService,
        private _signinService: SinginService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.notifier = notifierService;
    }
    resetForm() {
        this.khachhangForm = this.fb.group({
            Hoten: ['', Validators.required],
            Email: [
                '',
                [Validators.required, Validators.pattern(this.emailPattern)],
            ],
            SDT: [
                '',
                [Validators.required, Validators.pattern(this.phoneRegex)],
            ],
            Diachi: ['', Validators.required],
            ghichu: [''],
            idKH: [''],
        });
        this.donhangForm = this.fb.group({
            idDH: [''],
            idSP: [''],
            Soluong: [''],
            Dongia: [''],
            Khuyenmai: [''],
            Ghichu: [''],
        });
    }
    getCodeTp(e){
        this.diachi.filter(x=>{
            if(x.name == e.value){
                this.codeTp = x.code
                if(this.amount >=999000){
                    this.phiship = 0
                    this.amount += this.phiship
                }
                else if(x.code == 79){
                    this.phiship = 30000
                    this.amount += this.phiship

                }else{
                    this.phiship = 40000
                    this.amount += this.phiship

                }
                this._checkoutService.getDiachichitiet(x.code).subscribe()
                this._checkoutService.diachichitiet$.subscribe(res=>{
                    if(res){
                        this.diachichitiet = res
                        this.diachichitiet = this.diachichitiet.results
                    }
                
                })
            }
            
        })
        
    
    }
    ngOnInit(): void {
        this.resetForm();
        this._checkoutService.getDiachi().subscribe()
        this._checkoutService.diachi$.subscribe(res=>{
            if(res){
                this.diachi = res
                this.diachi = this.diachi.results

            }
            
        })
        this.cartService.getCart().subscribe();
        this.cartService.carts$.subscribe((res) => {
            this.carts = res;
        });
        this.cartService.amount$.subscribe((res) => (this.amount = res));
        if (this.token != null) {
            this._signinService.get().subscribe();
            this._signinService.user$.subscribe((res) => {
                if (res) {
                    this.khachhangForm.get('idKH').setValue(res.id);
                    this.khachhangForm.get('Hoten').setValue(res.profile.Hoten);
                    this.khachhangForm.get('Email').setValue(res.email);
                    this.khachhangForm.get('SDT').setValue(res.SDT);
                    this.khachhangForm
                        .get('Diachi')
                        .setValue(res.profile.Diachi);
                }
            });
        }
    }

    datHang() {
        
        
        if (this.khachhangForm.get('Hoten').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập ho và tên`);
        }
        if (this.khachhangForm.get('SDT').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập SDT`);
        }
        if (this.khachhangForm.get('SDT').hasError('pattern')) {
            this.notifier.notify('error', `Số điện thoại không đúng định dạng`);
        }
        if (this.khachhangForm.get('Email').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập Email`);
        }
        if (this.khachhangForm.get('Email').hasError('pattern')) {
            this.notifier.notify('error', `Email không đúng định dạng`);
        }
        if (this.khachhangForm.get('Diachi').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập địa chỉ`);
        }
        let diachi = this.khachhangForm.get('Diachi').value
        diachi = diachi +''+ this.TenQuanHuyen + ''+ this.TenTP
        
        if (this.khachhangForm.invalid) {
            return;
        }
        if (this.carts.length > 0) {
            this._checkoutService
                .postdonhang(this.khachhangForm.value)
                .subscribe((res) => {
                    this.notifier.notify('success', `Đặt hàng thành công`);

                    if (res) {
                        let idDH;

                        this._checkoutService.donhang$.subscribe((donhang) => {
                            console.log(donhang);
                            idDH = donhang.id;
                        });

                        this.carts.forEach((x) => {

                            this.donhangForm.get('idDH').setValue(idDH);
                            this.donhangForm.get('idSP').setValue(x.id);
                            this.donhangForm.get('Soluong').setValue(x.cartNum);
                            this.donhangForm.get('Dongia').setValue(x.GiaSale);
                            this._checkoutService
                                .postdonhangchitiet(this.donhangForm.value)
                                .subscribe((res) => {
                                    this.cartService.removeCart(x).subscribe();
                                    if (this.carts.length == 0) {
                                        const redirectURL =
                                            this._route.snapshot.queryParamMap.get(
                                                'redirectURL'
                                            ) || '/';
                                        this._router.navigateByUrl(redirectURL);
                                    }
                                });
                        });
                    }
                });
        } else {
            this.notifier.notify('error', `Bạn chưa có đơn hàng`);
        }

        // this.carts.forEach((x) => {
        //     this.khachhangForm.get('idP').setValue(x.id);
        //     this.khachhangForm.get('soluong').setValue(x.cartNum);
        //     this.khachhangForm.get('Giatien').setValue(x.Gia);
        // });
    }
}
