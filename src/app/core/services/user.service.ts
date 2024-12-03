import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {UserDTO, UserRequestDTO} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  /**
   * Create a new user without an image
   * @param user The user data
   * @returns Observable<UserDTO>
   */
  createUser(user: UserRequestDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}`, user);
  }

  /**
   * Create a new user with an image
   * @param user The user data as JSON
   * @param file The image file
   * @returns Observable<UserDTO>
   */
  createUserWithImage(user: string, file: File): Observable<UserDTO> {
    const formData = new FormData();
    formData.append('user', user);
    formData.append('file', file);

    const headers = new HttpHeaders().delete('Content-Type'); // Let the browser set it automatically
    return this.http.post<UserDTO>(`${this.apiUrl}/withImage`, formData, {headers});
  }

  /**
   * Delete a user by ID
   * @param userId The ID of the user
   * @returns Observable<{ deleted: boolean }>
   */
  deleteUser(userId: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${userId}`);
  }

  /**
   * Get the current user
   * @returns Observable<UserDTO>
   */
  getCurrentUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/current`);
  }
}
