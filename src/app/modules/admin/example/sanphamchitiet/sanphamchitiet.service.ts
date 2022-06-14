import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SanphamchitietService {
    private urlApi = 'http://localhost:3000/sanphamchitiet';
    post: any;
    private _sanphamchitiets: BehaviorSubject<any | null> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

  
    get sanphamchitiets$(): Observable<any> {
        return this._sanphamchitiets.asObservable();
    }

    postSanphamchitiet(data) {
        return this.sanphamchitiets$.pipe(
            take(1),
            switchMap((sanphamchitiets) =>
                this.http.post(this.urlApi, data).pipe(
                    map((course) => {
                        console.log(course);
                        console.log(data);

                        this._sanphamchitiets.next([course, ...sanphamchitiets]);

                        return course;
                    })
                )
            )
        );
    }

    // getTheme(){
    //   return this.http.get(this.urlApi+'/theme').pipe(
    //     map((themes) => {

    //         this._themes.next(themes);
    //         return themes;
    //     }),
    //   )
    // }
    // getMenu(){
    //   return this.http.get(this.urlApi+'/menu').pipe(
    //     map((menu) => {

    //         this._menu.next(menu);
    //         return menu;
    //     }),
    //   )
    // }
    getSanphamchitiet() {
        return this.http.get(this.urlApi).pipe(
            map((sanphamchitiets) => {
                this._sanphamchitiets.next(sanphamchitiets);
                return sanphamchitiets;
            })
        );
    }

    deleteSanphamchitiet(id) {
        return this.sanphamchitiets$.pipe(
            take(1),
            switchMap((sanphamchitiets) =>
                this.http.delete(this.urlApi + `/${id}`).pipe(
                    map((isDelete) => {
                        const updateSanphamchitiets = sanphamchitiets.filter((e) => e.id != id);

                        this._sanphamchitiets.next(updateSanphamchitiets);
                        return isDelete;
                    })
                )
            )
        );
    }
    updateSanphamchitiet(data) {
        return this.sanphamchitiets$.pipe(
            take(1),
            switchMap((sanphamchitiets) =>
                this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                    map((updateSanphamchitiet) => {
                        // Find the index of the updated tag
                        const index = sanphamchitiets.findIndex(
                            (item) => item.id === item.id
                        );

                        // Update the tag
                        sanphamchitiets[index] = data;

                        // Update the tags
                        this._sanphamchitiets.next(sanphamchitiets);

                        // Return the updated tag
                        return updateSanphamchitiet;
                    })
                )
            )
        );
    }
}
