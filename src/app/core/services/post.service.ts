import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {PostDTO} from "../../shared/models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  // core/services/post.service.ts
  getFeed(page = 0, size = 10): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${environment.apiUrl}/posts/feed`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  createPost(description: string, image?: File): Observable<PostDTO> {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('postDescription', description);
    return this.http.post<PostDTO>(`${environment.apiUrl}/posts`, formData);
  }
}
