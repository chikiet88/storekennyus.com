import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class DanhmucService {
    private urlApi = environment.url+'/danhmuc';
    post: any;
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

    AddDanhmuc(data) {
        return this.danhmucs$.pipe(
            take(1),
            switchMap((danhmucs) =>
                this.http.post(this.urlApi, data).pipe(
                    map((danhmuc) => {
                        this._danhmucs.next([danhmuc, ...danhmucs]);

                        return danhmuc;
                    })
                )
            )
        );
    }

    getDanhmuc() {
        return this.http.get(this.urlApi).pipe(
            map((danhmucs) => {
                this._danhmucs.next(danhmucs);

                return danhmucs;
            })
        );
    }
    deleteDanhmuc(id) {
        return this.danhmucs$.pipe(
            take(1),
            switchMap((danhmucs) =>
                this.http.delete(this.urlApi + `/${id}`).pipe(
                    map((isDelete) => {
                        const updatedanhmuc = danhmucs.filter(
                            (e) => e.id != id
                        );

                        this._danhmucs.next(updatedanhmuc);
                        return isDelete;
                    })
                )
            )
        );
    }

    updateDanhmuc(data) {
        return this.danhmucs$.pipe(
            take(1),
            switchMap((danhmucs) =>
                this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                    map((updatedanhmuc) => {
                        // Find the index of the updated tag
                        const index = danhmucs.findIndex(
                            (item) => item.id == data.id
                        );
                            console.log(index);
                            
                        // Update the tag
                        danhmucs[index] = updatedanhmuc;

                        // Update the tags
                        this._danhmucs.next(danhmucs);

                        // Return the updated tag
                        return updatedanhmuc;
                    })
                )
            )
        );
    }
}
