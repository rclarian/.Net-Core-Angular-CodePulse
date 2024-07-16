import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  model: LoginRequest;
  authSubscription?: Subscription;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }
  
  onFormSubmit(): void{
    this.authSubscription = this.authService.login(this.model)
      .subscribe({
        next: (res) => {
          //Set Auth Cookie
          this.cookieService.set('Authorization', `Bearer ${res.token}`, undefined, '/', undefined, true, 'Strict');

          //Redirect back to Home page
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log('Error on Login: ' + err);
        }
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

}
