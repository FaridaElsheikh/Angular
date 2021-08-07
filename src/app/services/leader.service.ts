import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
      private processHTTPMsg: ProcessHTTPMsgService
    ) { }
  //all leaders
    getLeaders(): Observable<Leader[]> {
      return this.http.get<Leader[]>(baseURL+'leadership').pipe(catchError(this.processHTTPMsg.handleError));   
    }
  //specific leader
    getLeader(id: string): Observable<Leader> {
      return this.http.get<Leader>(baseURL+'leadership/'+id).pipe(catchError(this.processHTTPMsg.handleError));   
    }
  //a featured leader
    getFeaturedLeader(): Observable<Leader>{
      return this.http.get<Leader>(baseURL+'leadership?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsg.handleError));
    }
}
