import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../features/auth/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  
  user?: User;
  navbarSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(): void {
    this.navbarSubscription = this.authService.user()
      .subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.log('Error navbar user: ' + err);
        }
      });
    
      this.user = this.authService.getUser();
  }

  onLogout(): void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnDestroy(): void {
    this.navbarSubscription?.unsubscribe();
  }

}
