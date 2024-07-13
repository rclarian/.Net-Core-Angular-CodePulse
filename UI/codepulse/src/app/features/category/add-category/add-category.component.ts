import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{

  model?: AddCategoryRequest;
  addCategorySubscription?: Subscription

  constructor(private categoryService: CategoryService, private router: Router){
    this.model = {
      name: '',
      urlHandle: ''
    }
  }

  onFormSubmit(){
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        this.router?.navigateByUrl('/admin/categories');
      },
      error: (error) => {
        console.log('Error: ' + error);
      }
    })
  }

  ngOnDestroy(){
    this.addCategorySubscription?.unsubscribe();
  }
}
