import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apollo: Apollo) {}

  getProfileById(id: number) {
    const GET_PROFILE_BY_ID = gql`
      query GetProfileById($id: Int!) {
        getProfileById(id: $id) {
          idProfile
          description
          userName
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_PROFILE_BY_ID,
      variables: { id },
    }).valueChanges;
  }

  // Otros métodos según tus necesidades...
}