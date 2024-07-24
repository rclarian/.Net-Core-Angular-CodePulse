import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  baseApiUrl: string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getGenderList(): Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(`${this.baseApiUrl}/genders`);
  }
  
}
