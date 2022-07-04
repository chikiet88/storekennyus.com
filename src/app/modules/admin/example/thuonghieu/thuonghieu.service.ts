import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThuonghieuService {

  private urlApi = environment.url+'/thuonghieu';
  post: any;
  private _thuonghieus: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _thuonghieu: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get thuonghieus$(): Observable<any> {
      return this._thuonghieus.asObservable();
  }
  get thuonghieu$(): Observable<any> {
    return this._thuonghieu.asObservable();
}
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  AddThuonghieu(data) {
      return this.thuonghieus$.pipe(
          take(1),
          switchMap((thuonghieus) =>
              this.http.post(this.urlApi, data).pipe(
                  map((thuonghieu) => {
                      this._thuonghieus.next([thuonghieu, ...thuonghieus]);

                      return thuonghieu;
                  })
              )
          )
      );
  }

  getThuonghieu() {
      return this.http.get(this.urlApi).pipe(
          map((thuonghieus) => {
              this._thuonghieus.next(thuonghieus);

              return thuonghieus;
          })
      );
  }
  deleteThuonghieu(id) {
      return this.thuonghieus$.pipe(
          take(1),
          switchMap((thuonghieus) =>
              this.http.delete(this.urlApi + `/${id}`).pipe(
                  map((isDelete) => {
                      const updatethuonghieu = thuonghieus.filter(
                          (e) => e.id != id
                      );

                      this._thuonghieus.next(updatethuonghieu);
                      return isDelete;
                  })
              )
          )
      );
  }

  updateThuonghieu(data) {
      return this.thuonghieus$.pipe(
          take(1),
          switchMap((thuonghieus) =>
              this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                  map((updatethuonghieu) => {
                      // Find the index of the updated tag
                      const index = thuonghieus.findIndex(
                          (item) => item.id === data.id
                      );

                      // Update the tag
                      thuonghieus[index] = data;

                      // Update the tags
                      this._thuonghieus.next(thuonghieus);

                      // Return the updated tag
                      return updatethuonghieu;
                  })
              )
          )
      );
  }
}
