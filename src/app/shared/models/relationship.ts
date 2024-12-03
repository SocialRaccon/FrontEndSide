import {ImageProfileModel} from "./image-profile";

export interface RelationshipInfoDTO {
  idUser: number;
  userName: string;
  images: ImageProfileModel[];
  careerAcronym : string;
  careerName : string;
  controlNumber : string;
}
