import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy, OnInit{

  model: AddBlogPost;
  addBlogPostSubscription?: Subscription;
  categories$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService, private router: Router, private categoryService: CategoryService){
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true,
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories()
  }

  onFormSubmit(): void{
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (res) => {
          this.router?.navigateByUrl('/admin/blogposts');
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
