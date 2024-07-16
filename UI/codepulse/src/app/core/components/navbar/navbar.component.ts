import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  
  navbarSubscription?: Subscription;

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.navbarSubscription = this.authService.user()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log('Error navbar user: ' + err);
        }
      });
  }

  ngOnDestroy(): void {
    this.navbarSubscription?.unsubscribe();
  }

}
