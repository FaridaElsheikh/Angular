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
      return new Promise (
        resolve =>{
          //simulate server latency with 2 sec delay
          setTimeout(()=>resolve(LEADERS),2000);
        });
    }
  //specific leader
    getLeader(id: string): Promise<Leader> {
      return new Promise (
        resolve =>{
          //simulate server latency with 2 sec delay
          setTimeout(()=>resolve(LEADERS.filter((leader) => (leader.id === id))[0]),2000);
        });
    }
  //a featured leader
    getFeaturedLeader(): Promise<Leader>{
      return new Promise (
        resolve =>{
          //simulate server latency with 2 sec delay
          setTimeout(()=>resolve(LEADERS.filter((leader) => leader.featured)[0]),2000);
        });
      
    }
}
