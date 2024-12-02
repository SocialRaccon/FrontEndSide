import {ImageProfileModel} from "./image-profile";

export interface RelationshipInfoDTO {
  idUser: number;
  userName: string;
  images: ImageProfileModel[];
}
