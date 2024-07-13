import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  
  id: string | null = null;
  model?: BlogPost;
  routeSubscription?: Subscription;
  categories$? : Observable<Category[]>;
  selectedCategories?: string[];

  constructor(
    private route: ActivatedRoute, 
    private blogPostService: BlogPostService, 
    private categoryService: CategoryService,
    private router: Router){

  }
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

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
              this.selectedCategories = res.categories.map(x => x.id);
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
    this.routeSubscription?.add(sub1);
    this.routeSubscription?.add(sub2);
  }

  onFormSubmit(): void{
    //Convert this model to Request Object
    let sub3: any;
    if(this.model && this.id){
      var updateBlogPost: UpdateBlogPost = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        urlHandle: this.model.urlHandle,
        author: this.model.author,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? []
      };

      sub3 = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (res) => {
            this.router?.navigateByUrl('/admin/blogposts');
          },
          error: (err) => {
            console.log('Error on updateBlogPost: ' + err)
          }
        });
    }
    this.routeSubscription?.add(sub3);
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

}
