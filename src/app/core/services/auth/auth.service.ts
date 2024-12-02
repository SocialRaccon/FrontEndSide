import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {environment} from '../../../../environments/environment.development';
import {User, UserDTO} from '../../../shared/models/user';

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

  login(email: string, password: string): Observable<UserDTO> {
    const token = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.get<UserDTO>(
      `${this.apiUrl}/users/current`,
      {
        headers: headers,
        withCredentials: true,
        observe: 'response'
      },
    ).pipe(
      map(response => {
        // Crear el objeto usuario con la respuesta
        const user: UserDTO = {
          email: email,
          token: token,
          idUser: response.body!.idUser,
          name: response.body!.name,
          lastName: response.body!.lastName,
          secondLastName: response.body!.secondLastName,
          controlNumber: response.body!.controlNumber,
          careerName: response.body!.careerName
        };

        // Guardar en sessionStorage
        const userToStore = {
          ...user,
        };
        sessionStorage.setItem('currentUser', JSON.stringify(userToStore));

        // Actualizar el BehaviorSubject
        this.currentUserSubject.next(user);

        return user;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        if (error.status === 0) {
          return throwError(() => new Error('Error de conexión al servidor. Verifique que el servidor esté funcionando.'));
        } else if (error.status === 401) {
          return throwError(() => new Error('Credenciales inválidas'));
        }
        return throwError(() => new Error('Error en el servidor. Por favor intente más tarde.'));
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private getUserFromStorage(): User | null {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
