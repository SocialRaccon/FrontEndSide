import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RelationshipInfoDTO} from "../../shared/models/relationship";

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  private url = environment.apiUrl + '/relationships';

  constructor(private http: HttpClient) {
  }

  getFollowers(userId: number): Observable<RelationshipInfoDTO[]> {
    return this.http.get<RelationshipInfoDTO[]>(`${this.url}/followers/${userId}`);
  }

  getFollowing(userId: number | null): Observable<RelationshipInfoDTO[]> {
    return this.http.get<RelationshipInfoDTO[]>(`${this.url}/following/${userId}`

    );
  }

  follow(userId: number, followerId: number): Observable<String> {
    return this.http.post<String>(`${this.url}/${userId}`, null,
      {
        params: {
          followerId: followerId.toString()
        },
        responseType: 'text' as 'json'
      });
  }

  unfollow(userId: number, followerId: number): Observable<String> {
    return this.http.delete<String>(`${this.url}/${userId}`, {
      params: {
        followerId: followerId.toString()
      },
      responseType: 'text' as 'json'
    });
  }
}
