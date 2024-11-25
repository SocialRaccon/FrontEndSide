import {ImagePostModel} from "./image-post";
import {CommentDTO} from "./comment";
import {ReactionDTO} from "./reaction";

export interface PostDTO {
  post: number;
  dateCreated: string;
  idUser: number;
  userName: string;
  userLastName: string;
  userSecondLastName: string;
  userControlNumber: string;
  postDescription: string;
  comments: CommentDTO[];
  reactions: ReactionDTO[];
  images: ImagePostModel[];
}
