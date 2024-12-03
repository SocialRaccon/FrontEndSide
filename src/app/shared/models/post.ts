import {ImagePostModel} from "./image-post";
import {CommentDTO} from "./comment";
import {ReactionDTO} from "./reaction";
import {ImageProfileModel} from "./image-profile";

export interface PostDTO {
  post: number;
  dateCreated: string;
  idUser: number;
  userName: string;
  userLastName: string;
  userSecondLastName: string;
  userControlNumber: string;
  postDescription: string;
  imageProfile: ImageProfileModel;
  comments: CommentDTO[];
  reactions: ReactionDTO[];
  images: ImagePostModel[];
}
