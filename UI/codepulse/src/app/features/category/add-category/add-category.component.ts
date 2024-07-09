import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  model: AddCategoryRequest;

  constructor(private categoryService: CategoryService){
    this.model = {
      Name: '',
      UrlHandle: ''
    }
  }

  onFormSubmit(){
    this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        console.log('Success: ' + response);
      },
      error: (error) => {
        console.log('Error: ' + error);
      }
    })
  }
}
