import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
// import { Khoahoc } from '../theme/theme.types';
import {environment} from "../../../../../environments/environment.prod"
@Injectable({
  providedIn: 'root'
})
export class BaivietService {

  private urlApi = 'http://localhost:3000'
  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _courses: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);


  constructor(private http:HttpClient) { }


  get themes$(): Observable<any>{
    return this._themes.asObservable();
  }
  get theme$(): Observable<any>{
    return this._themes.asObservable();
  }
  get menu$(): Observable<any>{
    return this._menu.asObservable();
  }
  get courses$(): Observable<any>{
    return this._courses.asObservable();
  }

  postCourse(data){
    return this.courses$.pipe(
      take(1),
      switchMap(courses => this.http.post(this.urlApi+'/baiviet',data).pipe(
        map((course)=>{
          console.log(course);
          console.log(data);
          
          this._courses.next([course,...courses ]);

          return course
        })
      ))
    )
  }

  getTheme(){
    return this.http.get(this.urlApi+'/theme').pipe(
      map((themes) => {

          this._themes.next(themes);          
          return themes;
      }),
    )
  }
  getMenu(){
    return this.http.get(this.urlApi+'/menu').pipe(
      map((menu) => {

          this._menu.next(menu);
          return menu;
      }),
    )
  }
  getBaiviet(){
    return this.http.get(this.urlApi+'/baiviet').pipe(
      map((courses) => {
          console.log(courses);
          
          this._courses.next(courses);
          return courses;
      }),
    )
  }


  deleteBaiviet(id){

    return this.courses$.pipe(
      take(1),
      switchMap(courses=>this.http.delete(this.urlApi+`/baiviet/${id}`).pipe(map((isDelete => {
        
       const updateCourses =  courses.filter(e => e.id != id);
        
        this._courses.next(updateCourses)
        return isDelete

      }))))
    )

  }
  updateBaiviet(data){
    return this.courses$.pipe(
      take(1),
      switchMap(courses => this.http.patch(this.urlApi+`/baiviet/${data.id}`, data).pipe(
          map((updateCourse) => {

              // Find the index of the updated tag
              const index = courses.findIndex(item => item.id === item.id);

              // Update the tag
              courses[index] = data;

              // Update the tags
              this._courses.next(courses);

              // Return the updated tag
              return updateCourse;
          })
      ))
  );
    
  }
}
