import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/userModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string): Observable<User>{
    return this.http.post<User>(`${environment.backURL}/login`, {
      username: username,
      password: password
    });
  }
}