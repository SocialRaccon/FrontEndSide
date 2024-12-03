import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment.development";
import {ReactionDTO, ReactionTypeDTO} from "../../shared/models/reaction";

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  private apiUrl = `${environment.apiUrl}/reactions`;

  constructor(private http: HttpClient) {
  }

  /**
   * Get all reactions for a post, paginated.
   * @param postId ID of the post.
   * @param page Current page number.
   * @param pageSize Number of reactions per page.
   */
  getReactionsByPostId(postId: number, page: number = 0, pageSize: number = 10): Observable<ReactionDTO[]> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<ReactionDTO[]>(`${this.apiUrl}/${postId}`, {params});
  }

  /**
   * Get the total count of reactions for a post.
   * @param postId ID of the post.
   */
  getReactionCount(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/${postId}`);
  }

  /**
   * Get the count of reactions for a post filtered by reaction type.
   * @param postId ID of the post.
   * @param reactionType ID of the reaction type.
   */
  getReactionCountByType(postId: number, reactionType: number): Observable<number> {
    const params = new HttpParams().set('reactionType', reactionType.toString());
    return this.http.get<number>(`${this.apiUrl}/countType/${postId}`, {params});
  }

  /**
   * Add or update a reaction for a post.
   * @param postId ID of the post.
   * @param userId ID of the user.
   * @param reactionTypeId ID of the reaction type.
   */
  reactOrUpdate(postId: number, userId: number, reactionTypeId: number): Observable<ReactionDTO> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('reactionTypeId', reactionTypeId.toString());
    return this.http.post<ReactionDTO>(`${this.apiUrl}/${postId}`, null, {params});
  }

  /**
   * Delete a user's reaction to a post.
   * @param postId ID of the post.
   * @param userId ID of the user.
   */
  deleteReaction(postId: number, userId: number): Observable<{ deleted: boolean }> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${postId}`, {params});
  }

  /*
  * //Get all reaction types with their names, icons, and ids
    @Operation(summary = "Get all reaction types")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found reaction types"),
            @ApiResponse(responseCode = "404", description = "Reaction types not found")
    })
    @GetMapping("/types")
    public List<ReactionTypeModel> getReactionTypes() {
        List<ReactionTypeModel> reactionTypes = reactionTypeService.getAll();
        if (reactionTypes.isEmpty()) {
            throw new NoSuchElementException("No reaction types found.");
        }
        return reactionTypes;
    }
  * */

  /**
   * Get all reaction types with their names, icons, and ids
   */
  getReactionTypes(): Observable<ReactionTypeDTO[]> {
    return this.http.get<ReactionTypeDTO[]>(`${this.apiUrl}/types`);
  }

}
