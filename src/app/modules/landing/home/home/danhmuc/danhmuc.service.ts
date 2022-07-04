import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, switchMap, take } from "rxjs";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root",
})
export class DanhmucService {
  private urlApi = environment.url+'/danhmuc';
  private _danhmucs: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get danhmucs$(): Observable<any> {
    return this._danhmucs.asObservable();
  }
  get danhmuc$(): Observable<any> {
    return this._danhmuc.asObservable();
  }
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  getDanhmuc() {
    return this.http.get(this.urlApi).pipe(
      map((danhmucs) => {
        this._danhmucs.next(danhmucs);

        return danhmucs;
      })
    );
  }
}
