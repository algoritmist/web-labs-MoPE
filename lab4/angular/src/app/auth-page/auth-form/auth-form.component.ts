import { Component } from '@angular/core';
import { User } from 'src/user';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-utils/auth.service';
import { Router } from '@angular/router';
import { DisplayModeService } from 'src/app/display-mode.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  constructor(private authService: AuthService, private router: Router, private dmService: DisplayModeService) {}

  isPhone(): boolean {
    return this.dmService.updateMode() === 'phone';
  }

  warning: string = '';

  isWarningPresent(): boolean {
    return this.warning.length !== 0;
  }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
    Validators.pattern("[A-Za-z][A-Za-z0-9]*")  
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
    Validators.pattern("[A-Za-z0-9]*") 
  ]);

  getUser(): User {
    let username = this.name.value;
    let password = this.password.value;
    let user: User = {
      username: username!,
      password: password!
    }
    return user;
  }

  getUserAsString(): string {
    return JSON.stringify(this.getUser());
  }

  redirectToMain(): void {
    this.router.navigate(['']);
  }

  authorize(): void {
    if (this.name.valid && this.password.valid) {
      console.log("valid auth request");
      console.log(this.getUserAsString());
      let token = this.authService.doLogin(this.name.value!, this.password.value!);
      token.subscribe(val => {
        this.warning = '';
        this.redirectToMain();
      }, error => {
        if (error.status % 100 === 5) {
          this.warning = 'Unknown server error. Try again.';
        } else {
          this.warning = 'No user with such username and password.';
        }
      });
    }
  }

  register(): void {
    if (this.name.valid && this.password.valid) {
      console.log("valid register request");
      console.log(this.getUserAsString());
      let token = this.authService.doRegister(this.name.value!, this.password.value!);
      token.subscribe(val => {
        this.warning = '';
        this.redirectToMain();
      }, error => {
        if (error.status % 100 === 5) {
          this.warning = 'Unknown server error. Try again.';
        } else {
          this.warning = 'User with this username already exists.';
        }
      });
    }
  }
}
