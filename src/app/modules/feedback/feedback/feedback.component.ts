import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedForm: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  inviaFeedback(){
    console.log("feedback", this.feedForm);
  }

  validateForm(){
      let basicValidation = (this.feedForm.email==undefined || 
        this.feedForm.content==undefined);
    console.log("errore", basicValidation);
    return basicValidation;
  }

}
