import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserToken } from '../../user';
import { share, shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:34600/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  
  doLogin(user: string, pass: string){
    const l = this.login(user, pass);
    l.subscribe((data)=>this.setSession(data));
    return l;
  }

  doRegister(user: string, pass: string){
    const obs = this.register(user, pass);
    obs.subscribe(val => this.setSession(val));
    return obs;
  }

  register(username: string, password: string){
    return this.http.post<UserToken>(AUTH_API + 'register', {
      username: username,
      password: password
    },
      httpOptions).pipe(share());
  }

  login(username: string, password: string) {
    return this.http.post<UserToken>(AUTH_API + 'login', {
      username: username,
      password: password
    }, httpOptions).pipe(share());;
  }

  refresh(token: string) {
    let req = this.http.get<UserToken>(AUTH_API + 'refresh', {
      params: {refreshToken: token}
    });
    req.subscribe(token => this.setSession(token));
    return req;
  }

  logout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
  }

  setSession(token: UserToken){
    localStorage.setItem('token', token.token);
    console.log(token.token);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && typeof token !== "undefined";
  }
}
