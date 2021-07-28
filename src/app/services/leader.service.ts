import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import  { LEADERS  } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  //all leaders
    getLeaders(): Leader[] {
      return LEADERS;
    }
  //specific leader
    getLeader(id: string): Leader {
      return LEADERS.filter((leader) => (leader.id === id))[0];
    }
  //a featured leader
    getFeaturedLeader(): Leader{
      return LEADERS.filter((leader) => leader.featured)[0];
    }
}
