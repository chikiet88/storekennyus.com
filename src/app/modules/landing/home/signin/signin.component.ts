import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SinginService } from './singin.service';
import { ConfirmedValidator } from './ConfirmedValidator';
import { NotifierService } from 'angular-notifier';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
    private readonly notifier: NotifierService;
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    signInForm: FormGroup;
    signUpForm: FormGroup;
    phoneRegex =
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    constructor(
        private _signinService: SinginService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        notifierService: NotifierService // private _notifierService: NotifierService
    ) {
        this.notifier = notifierService;
    }

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            SDT: [
                '',
                [Validators.required, Validators.pattern(this.phoneRegex)],
            ],
            password: ['', Validators.required],
            rememberMe: [''],
        });
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: [
                '',
                [Validators.required, Validators.pattern(this.emailPattern)],
            ],
            password: ['', Validators.required],
            SDT: [
                '',
                [Validators.required, Validators.pattern(this.phoneRegex)],
            ],
            confirmPassword: ['', Validators.required],
        });
        // this._signinService.signIn().subscribe()
    }
    get f(): { [key: string]: AbstractControl } {
        return this.signInForm.controls;
    }
    get g(): { [key: string]: AbstractControl } {
        return this.signUpForm.controls;
    }
    signIn(): void {
        if (this.signInForm.get('SDT').hasError('required')) {
            if (this.f.SDT.errors.required) {
                this.notifier.notify('error', `Vui lòng nhập SDT`);
            }
            if (this.f.password.errors.required) {
                this.notifier.notify('error', `Vui lòng nhập password`);
            }
        } else {
            this._signinService.signIn(this.signInForm.value).subscribe(
                (data) => {
                    console.log(data);
                    if (data != 1 && data != 2) {
                        const redirectURL =
                            this._route.snapshot.queryParamMap.get(
                                'redirectURL'
                            ) || '/profile';

                        this._router.navigateByUrl(redirectURL);
                    }
                },
                (response) => {
                    console.log(response);

                    // Re-enable the form
                    // this.signInForm.enable();
                    // this.signInNgForm.resetForm();
                }
            );
        }
    }
    signUp() {
        if (this.signUpForm.get('SDT').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập SDT`);
        }
        if (this.signUpForm.get('SDT').hasError('pattern')) {
            this.notifier.notify('error', `Số điện thoại không đúng định dạng`);
        }
        if (this.signUpForm.get('email').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập email`);
        }
        if (this.signUpForm.get('email').hasError('pattern')) {
            this.notifier.notify('error', `Email không đúng định dạng`);
        }

        if (this.signUpForm.get('password').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập password`);
        }
        if (this.signUpForm.get('confirmPassword').hasError('required')) {
            this.notifier.notify('error', `Vui lòng xác nhận password`);
        }

        if (
            this.signUpForm.get('confirmPassword').value !=
            this.signUpForm.get('password').value
        ) {
            this.notifier.notify('error', ` Password không đúng`);
        } else {
            if (this.signUpForm.invalid) {
                return;
            }
            this.signUpForm.removeControl('confirmPassword');
            this._signinService
                .createNhanvien(this.signUpForm.value)
                .subscribe((res) => {
                    if (res == 1) {
                        this.notifier.notify(
                            'error',
                            'Số Điện Thoại Đã Tồn Tại'
                        );
                    } else if (res == 2) {
                        this.notifier.notify(
                            'error',
                            'Email Đã Tồn Tại'
                        );
                    } else {
                        this.notifier.notify(
                            'success',
                            'Tạo tài khoản thành công'
                        );
                    }
                });
        }
    }
}
