import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
//#37.Create Angular Services
export class CategoryService {

  url: string = environment.apiBaseUrl + '/Categories';
  constructor(private http: HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>(this.url, model);
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.url);
  }

}
