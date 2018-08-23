import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { ReplaySubject } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})


export class AddAlbumComponent implements OnInit {
  personsFocused: boolean = false;
  cityFocused: boolean = false;
  nameFocused: boolean = false;
  addStep: number = 1;

  addPersons: string;
  addCity: string;
  addFromDate: number;
  addToDate: number;
  addCouvUrl: string;
  addAlbumName: string;
  addPhotoListURLS: string[];

  constructor(private collection: AlbumService) {
  }

  manageFocus(evt) {
    console.log(evt.srcElement.id);
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

    if (evt.srcElement.id !== 'albumName') {
      this.nameFocused = false;
    } else {
      this.nameFocused = true;
    }
  }

  ngOnInit() {}

  valStep(evt) {
    console.log(evt);

    if (evt.step === 1) {
      this.addPersons = evt.persons;
      this.addCity = evt.city;
      this.addFromDate = evt.fromDate;
      this.addToDate = evt.toDate;
      this.addStep++;
    } else if (evt.step === 2) {
      this.addCouvUrl = evt.couvURL;
      this.addStep++;
    } else if (evt.step === 3) {
      this.addPhotoListURLS = evt.photoListURL;
      this.addAlbumName = evt.albumName;

      this.collection.sendAlbum(this.addPersons, this.addCity, this.addFromDate, this.addToDate, this.addCouvUrl, this.addAlbumName, this.addPhotoListURLS).subscribe(
        data => console.log('success', data),
        error => console.log('oops', error)
      );
    }
  }
}
