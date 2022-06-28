import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SinginService } from "./singin.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  constructor(
    private _signinService: SinginService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      SDT: ["", [Validators.required]],
      password: ["", Validators.required],
      rememberMe: [""],
    });
    this.signUpForm = this._formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      SDT: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
    // this._signinService.signIn().subscribe()
  }
  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this._signinService.signIn(this.signInForm.value).subscribe(
      (data) => {
        console.log(data);

        const redirectURL =
          this._route.snapshot.queryParamMap.get("redirectURL") || "/profile";

        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        console.log(response);

        // Re-enable the form
        // this.signInForm.enable();
        // this.signInNgForm.resetForm();
      }
    );
  }
  signUp() {
    this.signUpForm.removeControl("confirmPassword");
    this._signinService
      .createNhanvien(this.signUpForm.value)
      .subscribe((res) => console.log(res));
  }
}
