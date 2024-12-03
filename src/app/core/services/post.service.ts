import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {PostDTO} from "../../shared/models/post";
import {ImagePostModel} from "../../shared/models/image-post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {
  }

  // Obtener posts de un usuario con paginación
  getPostsByUserId(userId: number, page: number = 0, size: number = 10): Observable<PostDTO[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PostDTO[]>(`${this.apiUrl}/${userId}`, {params});
  }

  // Obtener feed de posts
  getFeed(page: number = 0, size: number = 10): Observable<PostDTO[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PostDTO[]>(`${this.apiUrl}/feed`, {params});
  }

  // Obtener feed aleatorio por carrera
  getRandomCareerFeed(acronym: string, page: number = 0, size: number = 10): Observable<PostDTO[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PostDTO[]>(`${this.apiUrl}/feed/career/${acronym}`, {params});
  }

  // Obtener feed de usuarios seguidos
  getFollowingFeed(userId: number, page: number = 0, size: number = 10): Observable<PostDTO[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PostDTO[]>(`${this.apiUrl}/feed/${userId}`, {params});
  }

  // Crear post con imágenes
  createPostWithImages(userId: number, postDescription: string, images: File[]): Observable<PostDTO> {
    const formData = new FormData();
    formData.append('postDescription', postDescription);
    images.forEach((image) => formData.append('images', image));

    return this.http.post<PostDTO>(`${this.apiUrl}/withImages/${userId}`, formData);
  }

  // Crear post sin imágenes
  createPost(userId: number, postDescription: string): Observable<PostDTO> {
    const params = new HttpParams().set('postDescription', postDescription);
    return this.http.post<PostDTO>(`${this.apiUrl}/${userId}`, {}, {params});
  }

  // Eliminar un post
  deletePost(postId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${postId}`
      , {responseType: 'text'}
    );
  }

  // Obtener imágenes de un post
  getImagesFromPost(postId: number, page: number = 0, size: number = 10): Observable<ImagePostModel[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<ImagePostModel[]>(`${this.apiUrl}/images/${postId}`, {params});
  }

  // Añadir múltiples imágenes a un post existente
  addImagesToPost(postId: number, images: File[]): Observable<any> {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));

    return this.http.post(`${this.apiUrl}/images/multiple/${postId}`, formData);
  }

  // Actualizar la descripción de un post
  updatePostDescription(postId: number, postDescription: string): Observable<PostDTO> {
    const params = new HttpParams().set('postDescription', postDescription);
    return this.http.put<PostDTO>(`${this.apiUrl}/${postId}`, {}, {params});
  }

  // Actualizar una imagen de un post
  updateImageInPost(postId: number, imageId: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    const params = new HttpParams().set('imageId', imageId.toString());
    return this.http.put(`${this.apiUrl}/images/${postId}`, formData, {params});
  }

  // Eliminar una imagen de un post
  deleteImageFromPost(postId: number, imageId: number): Observable<any> {
    const params = new HttpParams().set('imageId', imageId.toString());
    return this.http.delete(`${this.apiUrl}/images/${postId}`, {params});
  }
}
