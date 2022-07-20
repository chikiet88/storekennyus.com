import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi = environment.url+'/users';
  private _users: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private user: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get users$(): Observable<any[]> {
      return this._users.asObservable();
  }
  get user$(): Observable<any> {
      return this.user.asObservable();
  }
  constructor(private http: HttpClient) {}

  getUsers() {
      return this.http.get(this.urlApi).pipe(
          map((users) => {
              this._users.next(users);
              return users;
          })
      );
  }
  

 
}
