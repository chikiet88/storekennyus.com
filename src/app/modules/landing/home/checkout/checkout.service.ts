import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import {
    BehaviorSubject,
    map,
    Observable,
    ObservableInput,
    of,
    switchMap,
    throwError,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CheckoutService {
    private urlApi = environment.url;
    private _donhang: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _donhangs: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _diachi: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _diachichitiet: BehaviorSubject<any | null> = new BehaviorSubject(null);

    private _donhangchitiets: BehaviorSubject<any | null> = new BehaviorSubject(
        null
    );

    private _donhangchitiet: BehaviorSubject<any | null> = new BehaviorSubject(
        null
    );

    constructor(private http: HttpClient) {}
    get diachi$(): Observable<any[]> {
        return this._diachi.asObservable();
    }
    get diachichitiet$(): Observable<any[]> {
        return this._diachichitiet.asObservable();
    }
    get donhangs$(): Observable<any[]> {
        return this._donhangs.asObservable();
    }
    get donhangchitiets$(): Observable<any[]> {
        return this._donhangchitiets.asObservable();
    }
    get donhang$(): Observable<any> {
        return this._donhang.asObservable();
    }
    get donhangchitiet$(): Observable<any> {
        return this._donhangchitiet.asObservable();
    }
    // get theme$(): Observable<any>{
    //   return this._themes.asObservable();
    // }
    getDiachi() {
        return this.http.get('https://api.mysupership.vn/v1/partner/areas/province').pipe(
            map((diachi) => {
                console.log(diachi);
                this._diachi.next(diachi);
            })
        );
    }
    getDiachichitiet(code: number): Observable<any> {
        return this.http.get<any>(`https://api.mysupership.vn/v1/partner/areas/district?province=${code}`).pipe(
            map((diachichitiet) => {
                this._diachichitiet.next(diachichitiet);

                return diachichitiet;
            }),
            switchMap((diachichitiet) => {
                if (!diachichitiet) {
                    return throwError(
                        'Could not found course with id of ' + code + '!'
                    );
                }

                return of(diachichitiet);
            })
        );
    }
    getDonhang() {
        return this.http.get(this.urlApi + `/donhang`).pipe(
            map((donhangs) => {
                console.log(donhangs);
                this._donhangs.next(donhangs);
            })
        );
    }
    getAllDonhangChitiet(id: string): Observable<any> {
        return this.http.get<any>(this.urlApi + `/donhangchitiet`).pipe(
            map((donhangchitiet) => {
                this._donhangchitiets.next(donhangchitiet);

                return donhangchitiet;
            }),
            switchMap((donhangchitiet) => {
                if (!donhangchitiet) {
                    return throwError(
                        'Could not found course with id of ' + id + '!'
                    );
                }

                return of(donhangchitiet);
            })
        );
    }
    postdonhang(data) {
        return this.http.post(this.urlApi + `/donhang`, data).pipe(
            map((donhang) => {
                this._donhang.next(donhang);

                return donhang;
            })
        );
    }

    postdonhangchitiet(data) {
        return this.http.post(this.urlApi + `/donhangchitiet`, data).pipe(
            map((donhang) => {
                this._donhangchitiet.next(donhang);

                return donhang;
            })
        );
    }
}
