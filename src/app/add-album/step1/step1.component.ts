import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})

export class Step1Component implements OnInit {
  @Input() personsFocused: boolean = false;
  @Input() cityFocused: boolean = false;
  @Input() step: number = 1;

  @Output() step1validate: EventEmitter<object> = new EventEmitter();

  error: boolean = false;

  // Albums types
  persons: string = '';
  city: string = '';
  fromDate: string;
  toDate: string;

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    if (this.persons && this.city && this.fromDate) {
      this.step1validate.emit({
        step: 1,
        persons: this.persons,
        city: this.city,
        fromDate: moment(this.fromDate).format("DD/MM/YYYY"),
        toDate: moment(this.toDate).format("DD/MM/YYYY")
      });
    } else {
      this.error = true;
    }
  }
}
