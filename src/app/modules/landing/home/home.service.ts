import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private urlApi = environment.url;

  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get menu$(): Observable<any> {
    return this._menu.asObservable();
  }
 
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  getMenu() {
    return this.http.get(this.urlApi+'/menu').pipe(
      map((menu) => {
        this._menu.next(menu);

        return menu;
      })
    );
  }
}
