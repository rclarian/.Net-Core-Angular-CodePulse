import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy, OnInit{

  model: AddBlogPost;
  addBlogPostSubscription?: Subscription;
  onSelectImageSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  constructor(
    private blogPostService: BlogPostService, 
    private router: Router, 
    private categoryService: CategoryService,
    private imageService: ImageService){

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
    this.categories$ = this.categoryService.getAllCategories();

    this.onSelectImageSubscription = this.imageService.onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          if(this.model){
            this.model.featuredImageUrl = selectedImage.url;
            this.closeImageSelector();
          }
        },
        error: (err) => {
          console.log('Error on onSelectImage: ' + err);
        }
      });
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

  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(){
    this.addBlogPostSubscription?.unsubscribe();
    this.onSelectImageSubscription?.unsubscribe();
  }

}
