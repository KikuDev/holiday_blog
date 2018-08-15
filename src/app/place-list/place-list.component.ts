import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {
  places: object;

  constructor(private api: AlbumService) { }

  ngOnInit() {
   this.api.getAlbums().subscribe(data => this.places = data);
  }

}
