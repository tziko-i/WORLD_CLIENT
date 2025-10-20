import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private base = `${environment.apiUrl}/members`;

  constructor(private http: HttpClient) {}

  getMembers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.base).pipe(catchError(this.handleError));
  }

  getMemberById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }

  getMemberByDisplayName(displayName: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.base}/by-name/${encodeURIComponent(displayName)}`)
      .pipe(catchError(this.handleError));
  }

  createMember(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.base, user).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(() => err);
  }
}
