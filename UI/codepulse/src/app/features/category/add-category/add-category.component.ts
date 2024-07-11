import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { error } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription

  //#37.Create Angular Services
  constructor(private categoryService: CategoryService){
    this.model = {
      name: '',
      urlHandle: ''
    }
  }

  onFormSubmit(){
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        console.log('This was successful save!');
      },
      error: (error) => {
        console.log('Error: ' + error);
      }
    })
  }

  ngOnDestroy(){
    this.addCategorySubscription.unsubscribe();
  }
}
