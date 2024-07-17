import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request-model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
//#37.Create Angular Services
export class CategoryService {

  url: string = environment.apiBaseUrl;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.url}/api/Categories`);
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${this.url}/api/Categories/${id}`);
  }


  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>(`${this.url}/api/Categories?addAuth=true`, model);
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category>{
    return this.http.put<Category>(`${this.url}/api/Categories/${id}?addAuth=true`, updateCategoryRequest);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/api/Categories/${id}?addAuth=true`);
  }

}
