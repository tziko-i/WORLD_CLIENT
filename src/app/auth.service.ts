import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Use proxy-friendly relative path so ng dev-server proxy.conf.json can route /api to the API server
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  register(payload: any) {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(payload: any) {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }
}
