import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { environment } from 'environments/environment.prod';
import {
    BehaviorSubject,
    filter,
    map,
    Observable,
    of,
    ReplaySubject,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SinginService {
    private _authenticate: boolean = false;
    private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(
        false
    );

    private readonly notifier: NotifierService;
    private _nhanvien: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _nhanviens: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    private _user: ReplaySubject<any> = new ReplaySubject<any>(1);

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    constructor(
        private _httpClient: HttpClient,
        notifierService: NotifierService // private _notifierService: NotifierService
    ) {
        this.notifier = notifierService;
    }
    get authenticated$(): Observable<boolean> {
        return this._authenticated.asObservable();
    }
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
    signIn(credentials: {
        username: string;
        password: string;
    }): Observable<any> {
        if (this._authenticate) {
            return throwError('User is already logged in.');
        }
        return this._httpClient
            .post(`${environment.url}/auth/login`, credentials)
            .pipe(
                switchMap((response: any) => {
                    console.log(response);

                    if (response === 1) {
                        this.notifier.notify(
                            'error',
                            `Số Điện Thoại Không Tồn Tại`
                        );
                        return of(response);
                    } else if (response === 2) {
                        this.notifier.notify('error', `Mật Khẩu Không Đúng`);
                        return of(response);
                    } else {
                        this.accessToken = response.access_token;
                        this._authenticate = true;
                        this._authenticated.next(true);
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
                this._httpClient
                    .post<any>(`${environment.url}/users`, data)
                    .pipe(
                        map((result) => {
                            console.log(result);

                            const newNhanvien = result;
                            // this._nhanviens.next([
                            //     newNhanvien,
                            //     ...nhanviens,
                            // ]);
                            return newNhanvien;
                        })
                    )
            )
        );
    }
    updateNhanvien(id: string, data): Observable<any> {
        return this.nhanviens$.pipe(
            take(1),
            switchMap((nhanviens) =>
                this._httpClient
                    .patch<any>(`${environment.url}/users/${id}`, data)
                    .pipe(
                        map((updatedNhanvien) => {
                            console.log(updatedNhanvien);
                         
                            return updatedNhanvien;
                        }),
                        switchMap((updatedNhanvien) =>
                            this.nhanvien$.pipe(
                                take(1),
                                filter((item) => item && item.id === id),
                                tap(() => {
                                    this._nhanvien.next(updatedNhanvien);
                                    return updatedNhanvien;
                                })
                            )
                        )
                    )
            )
        );
    }
    get(): Observable<any> {
        return this._httpClient
            .get<any>(`${environment.url}/auth/profile`)
            .pipe(
                tap((user) => {
                    this._user.next(user);
                    return user;
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
                        this._authenticate = true;

                        this._authenticated.next(true);
                        this.user = response.user;

                        return of(true);
                    } else return of(false);
                })
            );
    }
    changepass(data: {
        user: any;
        oldpass: string;
        newpass: string;
    }): Observable<any> {
        console.log(data);
        return this._httpClient
            .post(`${environment.url}/auth/changepass`, data)
            .pipe(
                tap((response: any) => {
                    console.log(response);

                    return response;
                })
            );
    }
    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');
        this._authenticated.next(false);
        this._authenticate = false;

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
