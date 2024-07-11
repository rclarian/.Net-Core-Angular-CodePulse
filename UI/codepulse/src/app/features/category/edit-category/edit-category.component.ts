import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { error } from 'console';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription?: Subscription;
  paramsSubscription1?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {

  }
  
  //Get the id from click button
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          //get the data from the API for this category Id
          this.paramsSubscription1 = this.categoryService.getCategoryById(this.id)
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
  }

  onFormSubmit(): void {
    console.log(this.category);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.paramsSubscription1?.unsubscribe();
  }
}
