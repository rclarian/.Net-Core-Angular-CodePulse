import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseApiUrl: string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseApiUrl}/students`);
  }

}
