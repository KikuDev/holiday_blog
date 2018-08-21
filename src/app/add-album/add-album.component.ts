import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})


export class AddAlbumComponent implements OnInit {
  personsFocused: boolean = false;
  cityFocused: boolean = false;

  constructor() {
  }

  manageFocus(evt) {
    if (evt.srcElement.id !== 'persons') {
      this.personsFocused = false;
    } else {
      this.personsFocused = true;
    }

    if (evt.srcElement.id !== 'city') {
      this.cityFocused = false;
    } else {
      this.cityFocused = true;
    }
  }

  ngOnInit() {}
}
