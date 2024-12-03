import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el usuario del sessionStorage
    const currentUser = this.authService.currentUserValue;

    // Si hay un usuario autenticado, añadir el header de autorización
    if (currentUser?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${currentUser.token}`
        },
        withCredentials: true
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          //this.authService.logout();
          //this.router.navigate(['/auth/login']);
        console.log('Error en el interceptor', error);
        return throwError(() => error);
      })
    );
  }
}
