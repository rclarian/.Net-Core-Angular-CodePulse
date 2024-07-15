import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit, OnDestroy{

  url: string | null = null;
  paramsSubsription?: Subscription;
  blogPost$?: Observable<BlogPost>;

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService) {

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

    //Fetch blog details by url
    if(this.url){
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }

  ngOnDestroy(): void {
    this.paramsSubsription?.unsubscribe();
  }
}
