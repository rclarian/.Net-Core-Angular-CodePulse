import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit, OnDestroy{

  //categories?: Category[];
  private categorySubscription?: Subscription;
  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;

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
    this.categorySubscription = this.categoryService.getCategoryCount()
      .subscribe({
        next: (value) => {
          this.totalCount = value;
          this.list = new Array(Math.ceil(value / this.pageSize));
          this.categories$ = this.categoryService.getAllCategories(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        },
        error: (err) =>{
          console.log('Error on getCategoryCount: ' + err)
        }
      });
  }
  
  onSearch(query: string){
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDirection: string){
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }

  getPage(pageNumber: number){
    this.pageNumber = pageNumber;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage(){
    if(this.pageNumber - 1  < 1){
      return;
    }

    this.pageNumber -= 1;
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getNexPage(){
    if(this.pageNumber + 1  > this.list.length){
      return;
    }

    this.pageNumber += 1;
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

}
