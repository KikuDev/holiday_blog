import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  @Input() personsFocused: boolean = false;
  @Input() cityFocused: boolean = false;

  // Albums types
  persons: string = '';
  city: string = '';
  date: any;
  startDate: object;
  endDate: object;

  step: number = 1;

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    this.step++;
  }
}
