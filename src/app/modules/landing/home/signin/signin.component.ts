import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SinginService } from './singin.service';
import Validation from './ConfirmedValidator';
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
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(40),
                ],
            ],
            SDT: [
                '',
                [Validators.required, Validators.pattern(this.phoneRegex)],
            ],
            confirmPassword: [
                '',
                Validators.required,
            ],
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
                this.notifier.notify('error', `Vui l??ng nh???p SDT`);
            }
            if (this.f.password.errors.required) {
                this.notifier.notify('error', `Vui l??ng nh???p password`);
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
                }
            );
        }
    }
    signUp() {
        if (this.signUpForm.get('SDT').hasError('required')) {
            this.notifier.notify('error', `Vui l??ng nh???p SDT`);
        }
        if (this.signUpForm.get('SDT').hasError('pattern')) {
            this.notifier.notify('error', `S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng`);
        }
        if (this.signUpForm.get('email').hasError('required')) {
            this.notifier.notify('error', `Vui l??ng nh???p email`);
        }
        if (this.signUpForm.get('email').hasError('pattern')) {
            this.notifier.notify('error', `Email kh??ng ????ng ?????nh d???ng`);
        }

        if (this.signUpForm.get('password').hasError('required')) {
            this.notifier.notify('error', `Vui l??ng nh???p password`);
        }
        let password = this.signUpForm.get('password').value;
        password = password.split('');
        console.log(password);
        
        if (password.length < 6) {
            this.notifier.notify('error', `Vui l??ng nh???p m???t kh???u l???n h??n 6 k?? t???`);
        }
        if (password.length > 20) {
            this.notifier.notify('error', `Vui l??ng nh???p m???t kh???u nh??? 20 k?? t???`);
        }
        if (this.signUpForm.get('confirmPassword').hasError('required')) {
            this.notifier.notify('error', `Vui l??ng x??c nh???n password`);
        }

        if (
            this.signUpForm.get('confirmPassword').value !=
            this.signUpForm.get('password').value
        ) {
            this.notifier.notify('error', ` Password kh??ng ????ng`);
        } else {
            if (this.signUpForm.invalid) {
                return;
            }
            this._signinService
                .createNhanvien(this.signUpForm.value)
                .subscribe((res) => {
                    if (res == 1) {
                        this.notifier.notify(
                            'error',
                            'S??? ??i???n Tho???i ???? T???n T???i'
                        );
                    } else if (res == 2) {
                        this.notifier.notify('error', 'Email ???? T???n T???i');
                    } else {
                        this.notifier.notify(
                            'success',
                            'T???o t??i kho???n th??nh c??ng'
                        );
                        this.signUpForm.reset();
                    }
                });
        }
    }
}
