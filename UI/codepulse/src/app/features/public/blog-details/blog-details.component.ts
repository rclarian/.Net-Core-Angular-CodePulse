import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit, OnDestroy{

  url: string | null = null;
  paramsSubsription?: Subscription;

  constructor(private route: ActivatedRoute) {

  }
  
  ngOnInit(): void {
    this.paramsSubsription = this.route.paramMap
      .subscribe({
        next: (params) => {
          this.url = params.get('url');
        },
        error: (err) => {
          console.log('Error on Param' + err);
        }
      });
  }

  ngOnDestroy(): void {
    this.paramsSubsription?.unsubscribe();
  }

}
