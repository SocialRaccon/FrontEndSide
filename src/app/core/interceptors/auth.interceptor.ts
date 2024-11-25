// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class AuthInterceptor
  //implements HttpInterceptor
{
  /*constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    const isApiUrl = request.url.includes(environment.apiUrl);

    if (currentUser?.token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${currentUser.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          console.error('Error de conexión al servidor');
        } else if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }*/
}
