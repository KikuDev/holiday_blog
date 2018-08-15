import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';
const USER = 'USER';
const PHOTO = 'PHOTO';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  setUser(user: string, photo: string): void {
    localStorage.setItem(USER, user);
    localStorage.setItem(PHOTO, photo);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}