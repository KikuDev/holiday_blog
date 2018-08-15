import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/userModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string): Observable<User>{
    return this.http.post<User>('http://localhost:8081/login', {
      username: username,
      password: password
    });
  }
}