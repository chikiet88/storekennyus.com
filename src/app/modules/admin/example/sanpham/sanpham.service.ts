import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { Product } from './sanpham.type';

@Injectable({
    providedIn: 'root',
})
export class SanphamService {
    private urlApi = environment.url+'/sanpham';
    private _products: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _product: BehaviorSubject<any | null> = new BehaviorSubject(null);

    get products$(): Observable<Product[]> {
        return this._products.asObservable();
    }
    get product$(): Observable<any> {
        return this._product.asObservable();
    }
    constructor(private http: HttpClient) {}
    postProduct(data) {
        return this.products$.pipe(
            take(1),
            switchMap((proudcts) =>
                this.http.post(this.urlApi, data).pipe(
                    map((product) => {
                        console.log(product);
                        this._products.next([product, ...proudcts]);
                        return product;
                    })
                )
            )
        );
    }
    getProduct() {
        return this.http.get(this.urlApi).pipe(
            map((products) => {
                this._products.next(products);
                return products;
            })
        );
    }
    updateProduct(data) {
        return this.products$.pipe(
            take(1),
            switchMap((courses) =>
                this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                    map((updateCourse) => {
                        // Find the index of the updated tag
                        const index = courses.findIndex(
                            (item) => item.id === item.id
                        );

                        // Update the tag
                        courses[index] = data;

                        // Update the tags
                        this._products.next(courses);

                        // Return the updated tag
                        return updateCourse;
                    })
                )
            )
        );
       
    }
    deleteSanpham(data){
        return this.products$.pipe(
            take(1),
            switchMap(productss=>this.http.delete(this.urlApi+`/${data.id}`).pipe(map((isDelete => {
              
             const updateSanpham =  productss.filter(e => e.id != data.id);
              
              this._products.next(updateSanpham)
              return isDelete
      
            }))))
          )
    }
}
