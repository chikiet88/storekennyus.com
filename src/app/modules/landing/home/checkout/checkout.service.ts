import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable, ObservableInput, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private urlApi = environment.url
  private _donhang: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _donhangchitiet: BehaviorSubject<any | null> = new BehaviorSubject(null);


  constructor(private http: HttpClient) {}

  get donhang$(): ObservableInput<any> {
    return this._donhang.asObservable();
  }
  get donhangchitiet$(): ObservableInput<any> {
    return this._donhangchitiet.asObservable();
  }
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  postdonhang(data) {
    return this.http.post(this.urlApi+`/donhang`, data).pipe(
      map((donhang) => {
        this._donhang.next(donhang);
        
        return donhang;
      })
    );
  }
  postdonhangchitiet(data) {
    return this.http.post(this.urlApi+`/donhangchitiet`, data).pipe(
      map((donhang) => {
        this._donhangchitiet.next(donhang);

        return donhang;
      })
    );
  }
}
