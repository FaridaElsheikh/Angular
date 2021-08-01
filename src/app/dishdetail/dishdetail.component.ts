import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';

import { FormBuilder,FormGroup,NgForm,Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})



export class DishdetailComponent implements OnInit {

  dish!: Dish ;
  dishIds!: string[];
  prev:string | undefined;
  next:string |undefined;
  commentForm!: FormGroup;
  comment!:Comment;

  @ViewChild('cform') commentFormDirective!: NgForm;

  formErrors={
    'author':'',
    'rating':5,
    'comment':''
  };

  validationMessages={
    'author':{
      'required':'Author name is required',
      'minlength':'Author name has to contain at least 2 characters'
    },
    'comment':{
      'required':'Your comment is required',
      'minlength':'You comment has to contain at least 2 characters'
    },
  }
  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe((dishIds)=>this.dishIds=dishIds);
    this.route.params
    .pipe(switchMap((params:Params)=>this.dishservice.getDish(params['id'])))
    .subscribe(
      dish=>{this.dish =dish;  this.setPrevNext(dish.id);}
    );
  }

  setPrevNext(dishId:string | undefined = '0'){
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.commentForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2)]],
      rating:5,
      comment:['',[Validators.required,Validators.minLength(2)]]
    });
    this.commentForm.valueChanges.subscribe(
      data=>this.onValueChanged(data)
    );

    this.onValueChanged(); //reset form validation messages
  }

  onSubmit(){
    console.log(this.comment);
    this.comment = this.commentForm.value;
    this.comment.date=new Date().toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      author:'',
      rating:5,
      comment:''
    });
    //this.commentFormDirective.reset();
    console.log(this.comment);
  }


  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
