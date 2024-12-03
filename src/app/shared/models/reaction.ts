export interface ReactionDTO {
  idUser: number;
  userName: string;
  idPost: number;
  date: string;
  idReactionType: number;
  reactionName: string;
  reactionIcon: string;
}

export interface ReactionTypeDTO {
  idReactionType: number;
  name: string;
  reactionIcon: ReactionIconDTO;
}

export interface ReactionIconDTO {
  iconUrl: string;
  iconThumbnailUrl: string;
  idReactionIcon: number;
}
