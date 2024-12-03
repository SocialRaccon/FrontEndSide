import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment.development";
import {CommentDTO} from "../../shared/models/comment";

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {
  }

  /**
   * Create a comment for a specific post
   * @param postId ID of the post
   * @param comment Comment data to be created
   * @returns Observable with the created comment
   */
  create(postId: number, comment: { idUser: number; comment: string }): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(`${this.apiUrl}/post/${postId}`, comment);
  }

  /**
   * Delete a comment by ID
   * @param commentId ID of the comment to delete
   * @returns Observable with void response
   */
  delete(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }

  /**
   * Get comments by post ID with optional user filter and pagination
   * @param postId ID of the post
   * @param page Page number (optional, default is 0)
   * @param pageSize Number of items per page (optional, default is 10)
   * @param userId ID of the user to filter by (optional)
   * @returns Observable with a list of comments
   */
  getCommentsByPostId(
    postId: number,
    page: number = 0,
    pageSize: number = 10,
    userId?: number
  ): Observable<CommentDTO[]> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (userId) {
      params = params.set('userId', userId);
    }
    return this.http.get<CommentDTO[]>(`${this.apiUrl}/post/${postId}`, {params});
  }

  /**
   * Get comments by user ID with pagination
   * @param userId ID of the user
   * @param page Page number (optional, default is 0)
   * @param pageSize Number of items per page (optional, default is 10)
   * @returns Observable with a list of comments
   */
  getCommentsByUserId(userId: number, page: number = 0, pageSize: number = 10): Observable<CommentDTO[]> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<CommentDTO[]>(`${this.apiUrl}/user/${userId}`, {params});
  }

  /**
   * Update a comment by its ID
   * @param commentId ID of the comment to update
   * @param comment New comment content
   * @returns Observable with the updated comment
   */
  update(commentId: number, comment: string): Observable<CommentDTO> {
    const params = new HttpParams().set('comment', comment);
    return this.http.put<CommentDTO>(`${this.apiUrl}/${commentId}`, null, {params});
  }
}
