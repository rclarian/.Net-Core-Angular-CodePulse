import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  model: LoginRequest;
  authSubscription?: Subscription;

  constructor(private authService: AuthService) {
    this.model = {
      email: '',
      password: ''
    }
  }
  
  onFormSubmit(): void{
    this.authSubscription = this.authService.login(this.model)
      .subscribe({
        next: (res) => {
          console.log(res);
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
