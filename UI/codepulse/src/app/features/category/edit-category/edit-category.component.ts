import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request-model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription: Subscription = new Subscription();
  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {

  }
  
  //Get the id from click button
  ngOnInit(): void {
    let sub1: any;
    let sub2: any;
    sub1 = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          //get the data from the API for this category Id
          sub2 = this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.category = response;
            },
            error: (error) => {
              console.log('Error on GetCategoryById: ' + error)
            }
          })
        }
      },
      error: (error) => {
        console.log('Error on Edit params: ' + error)
      }
    });

    this.paramsSubscription?.add(sub1);
    this.paramsSubscription?.add(sub2);
  }

  onFormSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    //pass this object to service
    if(this.id){
      let sub3 = this.categoryService.updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) => {
            console.log('Error on updateCategory: ' + error);
          }
        });
        this.paramsSubscription?.add(sub3);  
    }
  }

  onDelete(): void{
    if(this.id){
      let sub4: any;
      if(confirm('Are you sure to delete this record?')){
        sub4 = this.categoryService.deleteCategory(this.id)
          .subscribe({
            next: (res) => {
              this.router.navigateByUrl('/admin/categories');
            },
            error: (err) => {
              console.log('Error on deleteCategory: ' + err);
            }
          });
      }
      this.paramsSubscription?.add(sub4);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.paramsSubscription?.unsubscribe();
  }
}
