import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { User, UserDTO } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    // Crear el token Basic Auth
    const token = btoa(`${email}:${password}`);

    // Configurar headers
    const headers = new HttpHeaders()
      .set('Authorization', `Basic ${token}`)
      .set('Content-Type', 'application/json');

    // Obtener datos del usuario actual usando el token
    return this.http.get<UserDTO>(`${this.apiUrl}/users/current`, {
      headers,
      withCredentials: true
    }).pipe(
      map(response => {
        const user: User = {
          email,
          token, // Guardamos el token Basic Auth para futuras peticiones
          name: response.name,
          lastName: response.lastName,
          secondLastName: response.secondLastName,
          controlNumber: response.controlNumber,
          careerName: response.careerName
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(error => {
        if (error.status === 0) {
          return throwError(() => new Error('Error de conexión al servidor'));
        } else if (error.status === 401) {
          return throwError(() => new Error('Credenciales inválidas'));
        }
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // Logout en el servidor
    this.http.post(`${this.apiUrl}/signout`, {}, {
      withCredentials: true
    }).subscribe();
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

}
