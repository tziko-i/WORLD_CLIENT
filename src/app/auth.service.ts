import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5094/api/auth';

  constructor(private http: HttpClient) {}

  register(payload: any) {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(payload: any) {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }
}
