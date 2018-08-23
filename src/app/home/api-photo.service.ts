import { Injectable } from '@angular/core';
import { AlbumInterface } from './album-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPhotoService {

  constructor(private http: HttpClient) { }

  sendAlbum(persons: string, city: string, fromDate: number, toDate: number, couvUrl: string, albumName: string, photoListURLS: string[]): Observable<AlbumInterface>{
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
