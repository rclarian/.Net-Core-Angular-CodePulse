import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  url: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${this.url}/api/BlogPosts`, data);
  }

  getAllBlogPosts() : Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${this.url}/api/BlogPosts`);
  }
  
  getBlogPostById(id: string): Observable<BlogPost>{
    return this.http.get<BlogPost>(`${this.url}/api/BlogPosts/${id}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.url}/api/BlogPosts/${id}`, updatedBlogPost);
  }

  deleteBlogPost(id: string): Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${this.url}/api/BlogPosts/${id}`);
  }
  
}
