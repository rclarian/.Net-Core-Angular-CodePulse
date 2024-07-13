import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  
  id: string | null = null;
  model?: BlogPost;
  routeSubscription?: Subscription;
  
  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService){

  }
  
  ngOnInit(): void {
    let sub1: any;
    let sub2: any;

    sub1 = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        //Get BlogPost from API
        if(this.id){
          sub2 = this.blogPostService.getBlogPostById(this.id)
          .subscribe({
            next: (res) => {
              this.model = res;
            },
            error: (err) => {
              console.log('Error on getBlogPostById: ' + err)
            }
          })
        }
      },
      error: (err) => {
        console.log('Error on Get Id: ' + err)
      }
    });
    this.routeSubscription.add(sub1);
    this.routeSubscription.add(sub2);
  }

  onFormSubmit(): void{

  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

}
