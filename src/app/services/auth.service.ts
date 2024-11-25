// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  email: string;
  authdata?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://tu-api-url'; // Ajusta a tu URL base
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  login(email: string, password: string): Observable<any> {
    // Crear el header de autenticación básica
    const authdata = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${authdata}`
    });

    // Hacer una petición a cualquier endpoint protegido para verificar credenciales
    return this.http.get(`${this.apiUrl}/profiles`, { headers })
      .pipe(
        map(response => {
          const user: User = {
            email,
            authdata
          };
          // Guardar usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getAuthorizationHeader(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.authdata ? `Basic ${currentUser.authdata}` : null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value?.authdata;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}