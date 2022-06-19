import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private urlApi = environment.url+'/donhang';
  private donhang: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get donhang$(): ObservableInput<any> {
    return this.donhang.asObservable();
  }

  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  postdonhang(data) {
    return this.http.post(this.urlApi, data).pipe(
      map((donhang) => {
        this.donhang.next(donhang);

        return donhang;
      })
    );
  }
}
