import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThuonghieuService {
  // private urlApi = environment.url+'danhmuc';
  private urlApi = 'http://localhost:3000/thuonghieu';

  private _thuonghieus: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get thuonghieus$(): Observable<any> {
    return this._thuonghieus.asObservable();
  }
 
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  getThuonghieu() {
    return this.http.get(this.urlApi).pipe(
      map((thuonghieus) => {
        this._thuonghieus.next(thuonghieus);

        return thuonghieus;
      })
    );
  }
}
