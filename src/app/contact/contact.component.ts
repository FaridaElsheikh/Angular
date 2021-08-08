import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,NgForm,Validators } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Feedback,ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback!: Feedback | any;
  contactType = ContactType;
  errMess:string | undefined;
  returnedFeedback!: Feedback | any;
  isShowingResponse =false;

  @ViewChild('fform') feedbackFormDirective!: NgForm;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages={
    'firstname':{
      'required':'First name is required',
      'minlength':'First name must be at least 2 characters long',
      'maxlength':'First name cannot be more that 25 characters'
    },
    'lastname':{
      'required':'Last name is required',
      'minlength':'Last name must be at least 2 characters long',
      'maxlength':'Last name cannot be more that 25 characters'
    },
    'telnum':{
      'required':'Tel. number is required',
      'pattern':'Tel. nummber must contain only numbers'
    },
    'email':{
      'required':'Email is required',
      'email':'Email not in valid format'
    }
  };

  constructor(private fb:FormBuilder,
      private feedbackService:FeedbackService
    ) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(
      data=>this.onValueChanged(data)
    );

    this.onValueChanged(); //reset form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback).subscribe(
      feedback=>{
        this.returnedFeedback=feedback;
        this.feedback=feedback;
      },
      errmess=> {
        this.feedback = null;
        this.errMess = <any> errmess
      },
      () => {
        this.isShowingResponse = true;
        setTimeout(() => {
            this.isShowingResponse = false;
          } , 5000
        );
      },
    );

    this.returnedFeedback=null;
    this.feedbackFormDirective.reset();
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
    
  }
  

}
