import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  
  private urlApi = environment.url+'/menu'
  post: any;
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);

   
  constructor(private http:HttpClient) { }


  get menu$(): Observable<any>{
    return this._menu.asObservable();
  }
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  Addmenu(data){
    return this.menu$.pipe(
      take(1),
      switchMap(menus => this.http.post(this.urlApi,data).pipe(
        map((menu)=>{
          
          this._menu.next([menu,...menus ]);

          return menu
        })
      ))
    )
  }

  getMenu(){
    return this.http.get(this.urlApi).pipe(
      map((menus) => {

          this._menu.next(menus);
          
          
          
          return menus;
      }),
    )
  }
  deleteMenu(id){
    return this.menu$.pipe(
      take(1),
      switchMap(menus=>this.http.delete(this.urlApi+`/${id}`).pipe(map((isDelete => {
        
       const updateMenu =  menus.filter(e => e.id != id);
        
        this._menu.next(updateMenu)
        return isDelete

      }))))
    )
    
  }
  
  updateMenu(data){
    return this.menu$.pipe(
      take(1),
      switchMap(menus => this.http.patch(this.urlApi+`/${data.id}`,data).pipe(
          map((updateMenu) => {

              // Find the index of the updated tag
              const index = menus.findIndex(item => item.id === item.id);

              // Update the tag
              menus[index] = data;

              // Update the tags
              this._menu.next(menus);

              // Return the updated tag
              return updateMenu;
          })
      ))
  );
  }
}
