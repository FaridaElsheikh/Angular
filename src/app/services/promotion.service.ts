import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs';


import {  map,catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private processHTTPMsg: ProcessHTTPMsgService,
      private http:HttpClient
    ) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL+'promotions').pipe(catchError(this.processHTTPMsg.handleError));   
  }

  getPromotion(id:string): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL+'promotions/'+id).pipe(catchError(this.processHTTPMsg.handleError));   
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL+'promotions?featured=true').pipe(map(promos => promos[0])).pipe(catchError(this.processHTTPMsg.handleError));
  }
}
