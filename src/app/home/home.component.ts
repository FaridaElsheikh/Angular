import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish|undefined;
  promotion:Promotion|undefined;
  leader:Leader|undefined;

  constructor(private promotionservice:PromotionService,
              private dishService:DishService,
              private leaderService:LeaderService
    ) { }

  ngOnInit(): void {
    this.dish=this.dishService.getFeaturedDish();
    this.promotion=this.promotionservice.getFeaturedPromotion();
    this.leader=this.leaderService.getFeaturedLeader();
  }

}