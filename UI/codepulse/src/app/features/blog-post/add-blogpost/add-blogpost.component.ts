import { Component, OnDestroy } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy{

  model: AddBlogPost;
  private addBlogPostSubscription?: Subscription

  constructor(private blogPostService: BlogPostService, private router: Router){
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true
    }
  }

  onFormSubmit(): void{
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (err) => {
          console.log('Error: ' + err);
        }
      });
  }

  ngOnDestroy(){
    this.addBlogPostSubscription?.unsubscribe();
  }

}
