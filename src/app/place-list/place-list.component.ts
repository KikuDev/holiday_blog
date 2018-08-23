import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {
  places: object;

  constructor(private api: AlbumService) { }

  ngOnInit() {
   this.api.getAlbums().subscribe(data =>{
    this.places = data;
    console.log(data);
   });
  }

}
