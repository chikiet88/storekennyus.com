import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment.prod";
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  private urlApi = environment.url+'/baiviet';
  // private urlApi = 'http://localhost:3000/baiviet';

  private _tintuc: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // _tintuc$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _tintucs: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _danhmucs: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get tintucs$(): Observable<any[]> {
    return this._tintucs.asObservable();
  }
  get tintuc$(): Observable<any[]> {
    return this._tintuc.asObservable();
  }
  get danhmucs$(): Observable<any[]> {
    return this._danhmucs.asObservable();
  }
  get danhmuc$(): Observable<any[]> {
    return this._danhmuc.asObservable();
  }

  getDanhmuc(): Observable<any[]> {
    return this.http.get<any[]>("https://v1apistorekennyus.chikiet.com/danhmuc").pipe(
      tap((danhmucs) => {
        this._danhmucs.next(danhmucs);
      })
    );
  }
  getDanhmucchitiet(id): Observable<any> {
    return this.http.get<any>(`this.urlApi+/danhmuc/${id}`).pipe(
      map((danhmuc) => {
        // Update the danhmuc
        this._danhmuc.next(danhmuc);

        // Return the danhmuc
        return danhmuc;
      }),
      switchMap((danhmuc) => {
        if (!danhmuc) {
          return throwError("Could not found danhmuc with id of " + id + "!");
        }

        return of(danhmuc);
      })
    );
  }

  getTintuc(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi).pipe(
      tap((tintucs) => {
        this._tintucs.next(tintucs);
      })
    );
  }
  getTintucChitiet(slug: string): Observable<any> {
    return (
      this.http
        .get<any>(this.urlApi + `/slug/${slug}`)
        // .get<any>(this.urlApi+`/${slug}`)

        .pipe(
          map((tintuc) => {
            // Update the tintuc
            this._tintuc.next(tintuc);

            // Return the tintuc
            return tintuc;
          }),
          switchMap((tintuc) => {
            if (!tintuc) {
              return throwError(
                "Could not found tintuc with id of " + slug + "!"
              );
            }

            return of(tintuc);
          })
        )
    );
  }
}
