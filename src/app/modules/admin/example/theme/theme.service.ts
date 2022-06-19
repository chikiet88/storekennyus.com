import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity } from 'lodash';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { Khoahoc } from './theme.types';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // private urlApi = 'https://v2api.timona.edu.vn/theme'
  private urlApi = 'http://localhost:3000/theme'

  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _theme: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);


  constructor(private http:HttpClient) { }


  get themes$(): Observable<Khoahoc[]>{
    return this._themes.asObservable();
  }
  get theme$(): Observable<Khoahoc>{
    return this._themes.asObservable();
  }
  get menu$(): Observable<any>{
    return this._menu.asObservable();
  }

  postTheme(data){
    return this.themes$.pipe(
      take(1),
      switchMap(themes => this.http.post(this.urlApi,data).pipe(
        map((newTheme)=>{
          this._themes.next([newTheme,...themes ]);

          return newTheme
        })
      ))
    )
  }

  getTheme(){
    return this.http.get(this.urlApi).subscribe({
      next: data => {
        this._themes.next(data)
      }
    })
  }
  deleteTheme(id){
    return this.themes$.pipe(
      take(1),
      switchMap(themes=>this.http.delete(this.urlApi+`/${id}`).pipe(map((isDelete => {
        
       const updateThemes =  themes.filter(e => e.id != id);
        
        this._themes.next(updateThemes)
        return isDelete

      }))))
    )
  }
  updateTheme(item){
    
    return this.themes$.pipe(
      take(1),
      switchMap(themes => this.http.patch(this.urlApi+`/${item.id}`,item).pipe(
          map((updateTheme) => {

              // Find the index of the updated tag
              const index = themes.findIndex(item => item.id === item.id);

              // Update the tag
              themes[index] = item;

              // Update the tags
              this._themes.next(themes);

              // Return the updated tag
              return updateTheme;
          })
      ))
  );
  }
  getMenu(){
    return this.http.get('https://v2api.timona.edu.vn/menu').pipe(
      map((menu) => {

          this._menu.next(menu);
          return menu;
      }),
    )
  }
  
}
