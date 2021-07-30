import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import  { LEADERS  } from '../shared/leaders';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  //all leaders
    getLeaders(): Observable<Leader[]> {
      return of(LEADERS).pipe(delay(2000));

    }
  //specific leader
    getLeader(id: string): Observable<Leader> {
      return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    }
  //a featured leader
    getFeaturedLeader(): Observable<Leader>{
      return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
      
    }
}
