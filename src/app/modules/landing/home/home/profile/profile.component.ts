import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SinginService } from "../signin/singin.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user;
  token = localStorage.getItem('accessToken') || null
  isLogin = false;
  constructor(
    private _signinService: SinginService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  signout() {
    this._signinService.signOut().subscribe((res) => {
      if (res == true) {
        this.isLogin = false;
        const redirectURL =
          this._route.snapshot.queryParamMap.get("redirectURL") || "/";
        this._router.navigateByUrl(redirectURL);
      }
    });
  }
  ngOnInit(): void {
    if(this.token != null){
      this._signinService.get().subscribe();
      this._signinService.user$.subscribe((res) => {
        this.user = res;
        console.log(this.user);
      });
    }else{
      const redirectURL =
          this._route.snapshot.queryParamMap.get("redirectURL") || "/";
        this._router.navigateByUrl(redirectURL);
    }
  }
}
