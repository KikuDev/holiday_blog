import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-home',
  templateUrl: './pre-home.component.html',
  styleUrls: ['./pre-home.component.scss']
})
export class PreHomeComponent implements OnInit {
  landscape: string = '../../assets/tempimg.jpg';

  constructor() { }

  ngOnInit() {
  }

}
