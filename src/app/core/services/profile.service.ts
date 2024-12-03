import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProfileDTO } from "../../shared/models/profile";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.apiUrl + '/profiles';

  constructor(private http: HttpClient) {}

  getProfile(id: number): Observable<ProfileDTO> {
    return this.http.get<ProfileDTO>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        console.error('Error getting profile', error);
        throw error;
      })
    );
  }

  addProfileImage(profileId: number, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<string>(`${this.url}/images/${profileId}`, formData, {
      responseType: 'text' as 'json'
    });
  }

  updateProfileImage(imageId: number, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    // Add imageId as a query parameter
    const params = new HttpParams().set('imageId', imageId.toString());
    return this.http.put<string>(`${this.url}/images/${imageId}`, formData, {
      params: params,
      responseType: 'text' as 'json'
    });
  }

  deleteProfileImage(imageId: number): Observable<string> {
    // Add imageId as a query parameter
    const params = new HttpParams().set('imageId', imageId.toString());
    return this.http.delete<string>(`${this.url}/images/${imageId}`, {
      params: params,
      responseType: 'text' as 'json'
    });
  }

  updateProfileByUserId(userId: number, description: string): Observable<ProfileDTO> {
    // Add description as a query parameter instead of request body
    const params = new HttpParams().set('description', description);
    return this.http.post<ProfileDTO>(`${this.url}/${userId}`, null, {
      params: params
    });
  }

  getProfileByUserId(userId: number): Observable<ProfileDTO> {
    return this.http.get<ProfileDTO>(`${this.url}/${userId}`);
  }

  getProfileByControlNumber(controlNumber: string): Observable<ProfileDTO> {
    return this.http.get<ProfileDTO>(`${this.url}/controlNumber/${controlNumber}`);
  }
}
