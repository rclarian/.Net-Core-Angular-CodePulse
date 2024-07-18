import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  //categories?: Category[];
  categories$?: Observable<Category[]>;
  //private getCategorySubscription?: Subscription;
  constructor(private categoryService: CategoryService){

  }
  
  // ngOnInit(): void {
  //   this.getCategorySubscription = this.categoryService.getAllCategories()
  //     .subscribe({
  //       next: (response) => {
  //         this.categories = response;
  //       },
  //       error: (error) => {
  //         console.log('Error on Category list: ' + error)
  //       }
  //     });
  // }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
      
  }
  
  onSearch(query: string){
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  // ngOnDestroy(): void {
  //   this.getCategorySubscription?.unsubscribe();
  // }

}
