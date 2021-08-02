import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish|undefined;
  promotion:Promotion|undefined;
  leader:Leader|undefined;
  dishErrMess:string |undefined;
  constructor(private promotionservice:PromotionService,
              private dishService:DishService,
              private leaderService:LeaderService,
              @Inject('BaseURL') public BaseURL
    ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(
      (dish)=>this.dish=dish,
      errMess => this.dishErrMess =<any> errMess
      );
    this.promotionservice.getFeaturedPromotion().subscribe(
      (promo)=>this.promotion=promo
    );
    this.leaderService.getFeaturedLeader().subscribe(
      (leader)=>this.leader=leader
    );
  }

}
