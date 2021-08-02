import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import {  map,catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,
              private processHTTPMsg :ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL+'dishes').pipe(catchError(this.processHTTPMsg.handleError));
  }

  getDish(id:string):Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes/'+id).pipe(catchError(this.processHTTPMsg.handleError));
  }

  getFeaturedDish(): Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsg.handleError));
    
  }

  getDishIds(): Observable<String[] | any>{
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id))).pipe(catchError(error=>error));
  }
}
