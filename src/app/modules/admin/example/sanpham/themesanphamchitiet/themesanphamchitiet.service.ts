import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesanphamchitietService {

  private urlApi = 'http://localhost:3000/themesanphamchitiet';
  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _theme: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get themes$(): Observable<any> {
      return this._themes.asObservable();
  }
  get theme$(): Observable<any> {
      return this._theme.asObservable();
  }
  

  postThemeSanphamchitiet(data) {
      return this.themes$.pipe(
          take(1),
          switchMap((themes) =>
              this.http.post(this.urlApi, data).pipe(
                  map((theme) => {
                      console.log(theme);
                      console.log(data);

                      this._themes.next([theme, ...themes]);

                      return theme;
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
  getThemeSanphamchitiet() {
      return this.http.get(this.urlApi).pipe(
          map((themes) => {
              console.log(themes);

              this._themes.next(themes);
              return themes;
          })
      );
  }

  deleteThemeSanphamchitiet(id) {
      return this.themes$.pipe(
          take(1),
          switchMap((themes) =>
              this.http.delete(this.urlApi + `/${id}`).pipe(
                  map((isDelete) => {
                      const updatethemes = themes.filter((e) => e.id != id);

                      this._themes.next(updatethemes);
                      return isDelete;
                  })
              )
          )
      );
  }
  updateThemeSanphamchitiet(data) {
      return this.themes$.pipe(
          take(1),
          switchMap((themes) =>
              this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                  map((updateCourse) => {
                      // Find the index of the updated tag
                      const index = themes.findIndex(
                          (item) => item.id === item.id
                      );

                      // Update the tag
                      themes[index] = data;

                      // Update the tags
                      this._themes.next(themes);

                      // Return the updated tag
                      return updateCourse;
                  })
              )
          )
      );
  }
}
