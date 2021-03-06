import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
      private processHTTPMsg: ProcessHTTPMsgService,
    ) { }

  submitFeedback(feedback :Feedback):Observable<Feedback>{
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL +'feedback',feedback,httpOptions)
    .pipe(catchError(this.processHTTPMsg.handleError));

  }
}
