import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import  { LEADERS  } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  //all leaders
    getLeaders(): Promise<Leader[]> {
      return Promise.resolve(LEADERS);
    }
  //specific leader
    getLeader(id: string): Promise<Leader> {
      return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    }
  //a featured leader
    getFeaturedLeader(): Promise<Leader>{
      return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    }
}
