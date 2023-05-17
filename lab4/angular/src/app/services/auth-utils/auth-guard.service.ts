import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public auth: AuthService, public router: Router) {}
  
  canActivate(): boolean {
    //return true;
    if (!this.auth.isAuthenticated()) {
      console.log("No auth token. Redirecting to the auth page.");
      this.router.navigate(['auth']);
      return false;
    }
    console.log("Auth token found. Access to the main page allowed.")
    return true;
  }
}
