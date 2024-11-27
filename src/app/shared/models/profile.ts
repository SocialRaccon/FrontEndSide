import {ImageProfileModel} from "./image-profile";

export interface ProfileDTO {
  idProfile: number;
  description: string;
  userName: string;
  images: Set<ImageProfileModel>;
  followersCount: number;
  followingCount: number;
  controlNumber: string;
}
