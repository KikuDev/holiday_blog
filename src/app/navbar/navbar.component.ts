import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart, Event } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() user: string;
  @Input() photo: string;
  hideRoute: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.router.url !== '/home/list' ?  this.hideRoute = true : this.hideRoute = false;
    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        event.url !== '/home/list' ?  this.hideRoute = true : this.hideRoute = false;
      }
    });
  }
}
