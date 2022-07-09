import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CheckoutService } from '../checkout/checkout.service';
import { ProductListService } from '../product-list/product-list.service';
// import { ConfirmPasswordValidator } from '../signin/ConfirmedValidator';
import { SinginService } from '../signin/singin.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    private readonly notifier: NotifierService;
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

    phoneRegex =
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    i = 1;
    user;
    profileForm: FormGroup;
    passwordForm: FormGroup;
    token = localStorage.getItem('accessToken') || null;
    isLogin = false;
    donhang: any[] = [];
    donhangchitiet: any[] = [];
    idUser;
    constructor(
        private _signinService: SinginService,
        private _route: ActivatedRoute,
        private _router: Router,
        notifierService: NotifierService,
        private _productListService: ProductListService,
        private fb: FormBuilder,
        private _checkoutService: CheckoutService
    ) {
        this.notifier = notifierService;
    }

    selectDonhang(item) {
        console.log(item.id);

        this._checkoutService.getAllDonhangChitiet(item.id).subscribe();
        this._checkoutService.donhangchitiets$.subscribe((res) => {
            res = res.filter((x) => x.idDH == item.id);

            if (res) {
                res.forEach((x) => {
                    this._productListService
                        .getProductDetail(x.idSP)
                        .subscribe();
                    this._productListService.product$.subscribe((product) => {
                        x.product = product;
                    });
                });
                this.donhangchitiet = res
                console.log(this.donhangchitiet);
            }
        });
    }

    signout() {
        this._signinService.signOut().subscribe((res) => {
            if (res == true) {
                const redirectURL =
                    this._route.snapshot.queryParamMap.get('redirectURL') ||
                    '/';
                this._router.navigateByUrl(redirectURL);
            }
        });
    }

    ChangePassword() {
        let newpassword = this.passwordForm.get('newpass').value;
        newpassword = newpassword.split('');
        if (this.passwordForm.get('oldpass').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập mật khẩu của bạn`);
        }
        if (this.passwordForm.get('newpass').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập mật khẩu mới của bạn`);
        } else if (newpassword.length < 6) {
            this.notifier.notify('error', `Vui lòng nhập mật khẩu hơn 6 ký tự`);
        } else if (newpassword.length > 20) {
            this.notifier.notify(
                'error',
                `Vui lòng nhập mật khẩu nhỏ hơn 20 ký tự`
            );
        }
        if (this.passwordForm.get('comfirmnewpass').hasError('required')) {
            this.notifier.notify('error', `Vui lòng xác nhận password`);
        }
        if (
            this.passwordForm.get('newpass').value !=
            this.passwordForm.get('comfirmnewpass').value
        ) {
            this.notifier.notify('error', ` Password không đúng`);
        } else {
            if (this.passwordForm.invalid) {
                return;
            }
        }

        const data = Object.assign(
            { user: this.user },
            this.passwordForm.value
        );
        this._signinService.changepass(data).subscribe((res) => {
            if (res == 1) {
                this.notifier.notify('error', 'Sai Mật Khẩu Hiện Tại');
            } else {
                this.passwordForm.reset();
                this.notifier.notify('success', 'Cập Nhật Mật Khẩu Thành Công');
            }
        });
    }
    UpdateProfile() {
        if (this.profileForm.get('profile.Hoten').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập ho và tên`);
        }
        if (this.profileForm.get('profile.SDT').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập SDT`);
        }
        if (this.profileForm.get('profile.SDT').hasError('pattern')) {
            this.notifier.notify('error', `Số điện thoại không đúng định dạng`);
        }
        if (this.profileForm.get('profile.Email').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập Email`);
        }
        if (this.profileForm.get('profile.Email').hasError('pattern')) {
            this.notifier.notify('error', `Email không đúng định dạng`);
        }
        if (this.profileForm.get('profile.Diachi').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập địa chỉ`);
        } else {
            if (this.profileForm.invalid) {
                return;
            }
        }

        this._signinService
            .updateNhanvien(this.idUser, this.profileForm.value)
            .subscribe((res) => {
                this.notifier.notify('succes', `Cập nhật thành công`);
            });
    }
    ngOnInit(): void {
        this.profileForm = this.fb.group({
            profile: this.fb.group({
                Hoten: ['', Validators.required],
                Email: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this.emailPattern),
                    ],
                ],
                SDT: [
                    '',
                    [Validators.required, Validators.pattern(this.phoneRegex)],
                ],
                Diachi: ['', Validators.required],
            }),
        });
        this.passwordForm = this.fb.group({
            oldpass: ['', Validators.required],
            newpass: ['', Validators.required],
            comfirmnewpass: ['', Validators.required],
        });
        if (this.token != null) {
            this._signinService.get().subscribe();
            this._signinService.user$.subscribe((res) => {
                this.user = res;
                this.idUser = res.id;
                if (this.idUser) {
                    this._checkoutService.getDonhang().subscribe();
                    this._checkoutService.donhangs$.subscribe((data) => {
                        if (data) {
                            data = data.filter((x) => x.idKH == this.idUser);
                            this.donhang = data;
                            this.donhang.sort(function (a, b) {
                                return b.Ngaytao - a.Ngaytao;
                            });
                            console.log(this.donhang);
                        }
                    });
                }
                this.profileForm
                    .get('profile.Hoten')
                    .setValue(res.profile.Hoten);
                this.profileForm.get('profile.SDT').setValue(res.SDT);
                this.profileForm.get('profile.Email').setValue(res.email);
                this.profileForm
                    .get('profile.Diachi')
                    .setValue(res.profile.Diachi);
            });
        } else {
            const redirectURL =
                this._route.snapshot.queryParamMap.get('redirectURL') || '/';
            this._router.navigateByUrl(redirectURL);
        }
    }
}
