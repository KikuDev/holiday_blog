import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  credentialError: boolean = false;
  errorMsg: string;
  passwordFocused: boolean = false;
  usernameFocused: boolean = false;

  constructor(private api: ApiService, private token: TokenService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.api.login(
      this.username,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.token.setToken(r.token);
            this.token.setUser(r.user, r.photo);
            this.router.navigateByUrl('/home/list');
          } else {
            this.credentialError = true;
            this.errorMsg = r.message;
          }
        },
        r => {
          this.errorMsg = r.error.error;
        });
  }

  manageFocus(evt) {
    if (evt.srcElement.id !== 'password') {
      this.passwordFocused = false;
    } else {
      this.passwordFocused = true;
    }

    if (evt.srcElement.id !== 'username') {
      this.usernameFocused = false;
    } else {
      this.usernameFocused = true;
    }
  }

}
