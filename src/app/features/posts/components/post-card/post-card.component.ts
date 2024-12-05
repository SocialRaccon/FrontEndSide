import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostDTO} from "../../../../shared/models/post";
import {CurrentUserDTO, UserDTO} from "../../../../shared/models/user";
import {CommentDTO} from 'app/shared/models/comment';
import {ReactionDTO} from 'app/shared/models/reaction';
import {ReactionService} from '@core/services/reaction.service';
import {CommentService} from '@core/services/comment.service';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input() post!: PostDTO;
  @Input() currentUser!: CurrentUserDTO | null;
  @Output() deletePost = new EventEmitter<number>();

  comments: CommentDTO[] = [];
  reactions: ReactionDTO[] = [];
  showComments = false;
  newComment = '';
  reactionCount = 0;
  userReaction: number | null = null;
  showReactionPicker = false;
  showReactionDetails = false;
  isLoadingReactions = false;
  error = '';

  // Mapeo de reacciones a URLs
  readonly REACTION_ICONS: { [key: number]: string } = {
    1: 'https://firebasestorage.googleapis.com/v0/b/socialraccoon-990a3.appspot.com/o/MeEnmapaLike.png?alt=media&token=4ead8dba-4c77-417e-8c7b-00e3ec64b9c3',
    2: 'https://firebasestorage.googleapis.com/v0/b/socialraccoon-990a3.appspot.com/o/MeEnmapaLove.png?alt=media&token=10dc5d23-5a60-40c5-944c-12dfb779558c',
    3: 'https://firebasestorage.googleapis.com/v0/b/socialraccoon-990a3.appspot.com/o/raccoon_love.png?alt=media&token=8a29e983-e4e8-4502-8b05-c17accbac07e',
    4: 'https://firebasestorage.googleapis.com/v0/b/socialraccoon-990a3.appspot.com/o/MeEnmapaSad.png?alt=media&token=76eba7e7-01f0-47e9-956d-1e7814655dc7'
  };

  readonly REACTION_NAMES: { [key: number]: string } = {
    1: 'Me Enmapa Like',
    2: 'Me Enmapa Love',
    3: 'Me Enmapa Cha',
    4: 'Me Enmapa Sad'
  };

  constructor(
    private reactionService: ReactionService,
    private commentService: CommentService
  ) {
  }

  private loadReactions() {
    if (!this.post.post) return;

    this.isLoadingReactions = true;
    this.reactionService.getReactionsByPostId(this.post.post).subscribe({
      next: (reactions) => {
        this.reactions = reactions;
        this.reactionCount = reactions.length;
        this.userReaction = reactions.find(r => r.idUser === this.currentUser?.idUser)?.idReactionType || null;
        this.isLoadingReactions = false;
      },
      error: (error) => {
        console.error('Error loading reactions:', error);
        this.isLoadingReactions = false;
      }
    });
  }

  private loadComments() {
    if (!this.post.post) return;
    this.commentService.getCommentsByPostId(this.post.post).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      }
    });
  }

  onReact(reactionTypeId: number) {
    if (!this.currentUser || !this.post.post) return;

    if (this.userReaction === reactionTypeId) {
      // Remove reaction
      this.reactionService.deleteReaction(this.post.post, this.currentUser.idUser).subscribe({
        next: () => {
          this.userReaction = null;
          this.loadReactions();
        },
        error: (error) => {
          console.error('Error removing reaction:', error);
        }
      });
    } else {
      // Add or update reaction
      this.reactionService.reactOrUpdate(this.post.post, this.currentUser.idUser, reactionTypeId)
        .subscribe({
          next: () => {
            this.userReaction = reactionTypeId;
            this.loadReactions();
          },
          error: (error) => {
            console.error('Error adding/updating reaction:', error);
          }
        });
    }
    this.showReactionPicker = false;
  }

  formatTimeAgo(date: string): string {
    const now = new Date();

    const postDate = new Date(date);
    const diff = now.getTime() - postDate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
    if (hours > 0) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    if (minutes > 0) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    return 'hace un momento';
  }

  submitComment() {
    if (!this.newComment.trim() || !this.currentUser || !this.post.post) return;

    this.commentService.create(this.post.post, {
      idUser: this.currentUser.idUser,
      comment: this.newComment.trim()
    }).subscribe(
      () => {
        this.loadComments();
        this.newComment = '';
      },
      error => {
        this.error = error.error.message;
      }
    )
  }

  ngOnInit() {
    this.loadReactions();
    this.loadComments();
  }

  onDeletePost() {
    if (this.post.post) {
      this.deletePost.emit(this.post.post);
    }
  }

  canDeletePost(): boolean {
    return this.currentUser?.idUser === this.post.idUser;
  }

  getUniqueReactionTypes() {
    return this.reactionService.getReactionTypes().pipe(
      map(types => types.filter(t => this.reactions.some(r => r.idReactionType === t.idReactionType)))
    );
  }

  canDeleteComment(comment: CommentDTO) {
    return this.currentUser?.idUser === comment.idUser;
  }

  deleteComment(idComment: number) {
    //Show alert for confirmation
    confirm('¿Estás seguro de que deseas eliminar este comentario?');
    this.commentService.delete(idComment).subscribe({
      next: () => {
        this.loadComments();
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }

  getReactionCountByType(type: number): number {
    return this.reactions.filter(r => r.idReactionType === type).length;
  }

  getTopThreeReactions(): number[] {
    const reactionCounts = new Map<number, number>();
    this.reactions.forEach(reaction => {
      const count = reactionCounts.get(reaction.idReactionType) || 0;
      reactionCounts.set(reaction.idReactionType, count + 1);
    });

    return Array.from(reactionCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
  }

  hasReactions(): boolean {
    return this.reactions.length > 0;
  }
}
