import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-date-pick',
  templateUrl: './date-pick.component.html',
  styleUrls: ['./date-pick.component.css']
})
export class DatePickComponent implements OnInit {
  today = new Date();
  minDate = new Date(1920, 0, 1);
  public sampleForm!: FormGroup;

  constructor(public fb: FormBuilder) {}
  ngOnInit() {
    // this.sampleForm = this.fb.group({
    //   sampleReceivedOn: [null, [Validators.required]],
    // });
    this.sampleForm = new FormGroup({
      sampleReceivedOn: new FormControl( [null, [Validators.required]])
   });
  }
  onDateFormat(control: any) {
    if (control.value) {
      console.log(control.value);

      this.sampleForm.controls.sampleReceivedOn.patchValue(
        moment(control.value).format('YYYY-MM-DD')
      );
    }
  }
}
