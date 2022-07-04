import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { environment } from "environments/environment.prod";
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  take,
  tap,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SinginService {
  private _authenticated: boolean = false;
  private readonly notifier: NotifierService;
  private _nhanvien: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _nhanviens: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _user: ReplaySubject<any> = new ReplaySubject<any>(1);

  set accessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken") ?? "";
  }
  constructor(
    private _httpClient: HttpClient
  ) // private _notifierService: NotifierService
  {}
  get nhanvien$(): Observable<any> {
    return this._nhanvien.asObservable();
  }
  get nhanviens$(): Observable<any[]> {
    return this._nhanviens.asObservable();
  }
  set user(value: any) {
    this._user.next(value);
  }
  get user$(): Observable<any> {
    return this._user.asObservable();
  }
  signIn(credentials: { username: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError("User is already logged in.");
    }
    return this._httpClient
      .post(`${environment.url}/auth/login`, credentials)
      .pipe(
        switchMap((response: any) => {
          console.log(response);
          
          if (response === 1) {
            this.notifier.notify("error", `Số Điện Thoại Không Tồn Tại`);
            return of(response);
          } else if (response === 2) {
            this.notifier.notify("error", `Mật Khẩu Không Đúng`);
            return of(response);
          } else {
            this.accessToken = response.access_token;
            // this._authenticated = true;
            // this._userService.user = response.user;
          }
          return of(response);
        })
      );
  }

  createNhanvien(data): Observable<any> {
    return this.nhanviens$.pipe(
      take(1),
      switchMap((nhanviens) =>
        this._httpClient.post<any>(`${environment.url}/users`, data).pipe(
          map((result) => {
            console.log(result);
            if (result == 1) {
              this.notifier.notify("error", "Số Điện Thoại Đã Tồn Tại");
            } else if (result == 2) {
              this.notifier.notify("error", "Email Đã Tồn Tại");
            } else {
              const newNhanvien = result;
              this._nhanviens.next([newNhanvien, ...nhanviens]);
              return newNhanvien;
            }
          })
        )
      )
    );
  }
  get(): Observable<any>
    {
        return this._httpClient.get<any>(`${environment.url}/auth/profile`).pipe(
            tap((user) => {
                this._user.next(user);
                return user
            })
        );
    }
  signInUsingToken(token): Observable<any> {
    return this._httpClient
      .post(`${environment.url}/auth/signbytoken`, {
        // access_token: this.accessToken,
        access_token: token,

      })
      .pipe(
        switchMap((response: any) => {
          if (response !== false) {
            this._authenticated = true;
            this.user = response.user;
            
            return of(true);
          } else return of(false);
        })
      );
  }
  signOut(): Observable<any> {
    localStorage.removeItem('accessToken');
    this._authenticated = false;
    return of(true);
}
  

  // getUser(): Observable<any>
  //   {
  //       return this._httpClient.get<any>(`${environment.url}/auth/profile`).pipe(
  //           tap((user) => {
  //               this._user.next(user);
  //           })
  //       );
  //   }
}
