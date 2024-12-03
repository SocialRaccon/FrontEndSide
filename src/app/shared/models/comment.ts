import {ImageProfileModel} from "./image-profile";

export interface CommentDTO {
  idComment: number;
  idUser: number;
  idPost: number;
  username: string;
  imageProfile: ImageProfileModel;
  comment: string;
  date: string;
}
/*
* {
    "idComment": 1,
    "idUser": 2,
    "idPost": 1,
    "username": "María González Hernández",
    "imageProfile": {
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socialraccoon-990a3.appspot.com/o/user.png?alt=media&token=c303a942-13e8-4758-a578-e5b6e70400a1",
      "imageThumbnailUrl": "https://firebasestorage.googleapis.com/v0/b/socialraccoon-990a3.appspot.com/o/user.png?alt=media&token=c303a942-13e8-4758-a578-e5b6e70400a1",
      "idImageProfile": 2
    },
    "comment": "Hola como esta eso?",
    "date": "2021-10-01 00:00:00"
  }
* */
