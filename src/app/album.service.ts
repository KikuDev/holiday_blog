import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { AlbumInterface } from './home/album-interface';
import { Observable } from '../../node_modules/rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbums () {
    return this.http.get(`${environment.backURL}/getAlbums`);
  }

  sendAlbum(persons: string, city: string, fromDate: number, toDate: number, couvUrl: string, albumName: string, photoListURLS: string[]): Observable<AlbumInterface>{
    console.log("album Service fired");
    console.log(persons, city, fromDate, toDate, couvUrl, albumName, photoListURLS);
    return this.http.post<AlbumInterface>(`${environment.backURL}/sendAlbum`, {
      persons: persons,
      city: city,
      fromDate: fromDate,
      toDate: toDate,
      couvUrl: couvUrl,
      albumName: albumName,
      photoListURLS: photoListURLS
    });
  }
}
