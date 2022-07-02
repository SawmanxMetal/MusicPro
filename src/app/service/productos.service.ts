import { Injectable, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlLocal: string = "http://localhost:3000"

  constructor( private http:HttpClient ) { }



  getEntrega(): Observable<any>{
     return this.http.get(`${this.urlLocal}/products`);
   }


}
