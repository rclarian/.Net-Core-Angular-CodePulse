import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.url}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

}
