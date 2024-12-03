import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {environment} from '../../../../environments/environment.development';
import {User, UserDTO} from '../../../shared/models/user';
import {Router} from "@angular/router";
import {AuthenticationDTO, PasswordRecoveryDTO} from "../../../shared/models/authentication";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<UserDTO | null>;
  public currentUser: Observable<UserDTO | null>;
  private router = inject(Router);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserDTO | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<UserDTO> {
    const token = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.get<UserDTO>(`${this.apiUrl}/users/current`,
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
    this.router.navigate(['/auth/login']);
  }

  //Ejemplo de uso:
  /*
  recoverPassword(email: string): void {
  const data: PasswordRecoveryDTO = { email };
  this.authService.recoverPassword(data).subscribe({
    next: response => console.log('Correo de recuperación enviado:', response),
    error: err => console.error(err.message)
  });
  }
   */

  // Recuperar contraseña
  recoverPassword(data: PasswordRecoveryDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/authentications/recover`, data).pipe(
      catchError(error => {
        console.error('Error en recoverPassword:', error);
        return throwError(() => new Error('No se pudo enviar el correo de recuperación. Intente nuevamente.'));
      })
    );
  }

  //Ejemplo de uso:
  /*
  changePassword(email: string, oldPassword: string, newPassword: string): void {
  const data: AuthenticationDTO = { email, password: oldPassword, newPassword };
  this.authService.changePassword(data).subscribe({
    next: response => console.log('Contraseña cambiada exitosamente:', response),
    error: err => console.error(err.message)
  });
  }
  */

  // Cambiar contraseña
  changePassword(data: AuthenticationDTO): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/authentications/change`, data).pipe(
      catchError(error => {
        console.error('Error en changePassword:', error);
        return throwError(() => new Error('No se pudo cambiar la contraseña. Intente nuevamente.'));
      })
    );
  }

  private getUserFromStorage(): UserDTO | null {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  get currentUserValue(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
