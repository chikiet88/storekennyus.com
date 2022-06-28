import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CauhinhService {
  private urlApi = environment.url+'/cauhinh'
  // private urlApi = 'http://localhost:3000/cauhinh'

  post: any;
  private _cauhinhs: BehaviorSubject< any | null> = new BehaviorSubject(null);
  private _cauhinh: BehaviorSubject<any | null> = new BehaviorSubject(null);


   
  constructor(private http:HttpClient) { }

  get cauhinh$(): Observable<any>{
    return this._cauhinh.asObservable();
  }
  get cauhinhs$(): Observable<any>{
    return this._cauhinhs.asObservable();
  }
 

  addCauhinh(data){
    return this.cauhinhs$.pipe(
      take(1),
      switchMap(cauhinhs => this.http.post(this.urlApi,data).pipe(
        map((cauhinh)=>{
          
          this._cauhinhs.next([cauhinh,...cauhinhs ]);

          return cauhinh
        })
      ))
    )
  }

  deleteCauhinh(id){

    return this.cauhinhs$.pipe(
      take(1),
      switchMap(courses=>this.http.delete(this.urlApi+`/${id}`).pipe(map((isDelete => {
        
       const updateCourses =  courses.filter(e => e.id != id);
        
        this._cauhinhs.next(updateCourses)
        return isDelete

      }))))
    )    
  }


  getCauhinh(){
    return this.http.get(this.urlApi).pipe(
      map((cauhinhs) => {

          this._cauhinhs.next(cauhinhs);
          return cauhinhs;
      }),
    )
  }

  updateCauhinh(data){
    return this.cauhinhs$.pipe(
      take(1),
      switchMap(courses => this.http.patch(this.urlApi+`/${data.id}`, data).pipe(
          map((updateCourse) => {

              // Find the index of the updated tag
              const index = courses.findIndex(item => item.id === item.id);

              // Update the tag
              courses[index] = data;

              // Update the tags
              this._cauhinhs.next(courses);

              // Return the updated tag
              return updateCourse;
          })
      ))
  );
    
  }
}
