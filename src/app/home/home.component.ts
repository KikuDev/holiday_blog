import { Component, OnDestroy} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  username: string;
  photo: string;

  constructor() {
    this.username = localStorage.getItem('USER');
    this.photo = localStorage.getItem('PHOTO');
  }

  ngOnDestroy() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('PHOTO');
  }

  hello(evt) {
    console.log(evt);
  }
}
