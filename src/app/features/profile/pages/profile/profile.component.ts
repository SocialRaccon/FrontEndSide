import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileDTO} from "../../../../shared/models/profile";
import {ImageProfileModel} from "../../../../shared/models/image-profile";
import {ProfileService} from "@core/services/profile.service";
import {RelationshipService} from "@core/services/relationship.service";
import {UserDTO} from "../../../../shared/models/user";
import {finalize} from 'rxjs/operators';
import {PostService} from '@core/services/post.service';
import {AuthService} from '@core/services/auth/auth.service';
import {PostDTO} from 'app/shared/models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public txtFollow: string = 'Follow';
  public profile: ProfileDTO | null = null;
  public currentProfileImage: ImageProfileModel | null = null;
  public isLoading: boolean = true;
  public error: string | null = null;
  public userIdActive: number = 0;
  public userIdProfile: number = 0;
  protected isUpdatingFollowStatus: boolean = true;
  posts: PostDTO[] = [];
  currentPage = 0;
  pageSize = 10;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private relationshipService: RelationshipService,
    private postService: PostService,
    protected authService: AuthService
  ) {
    // ... código existente ...
  }

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.userIdActive = parseInt(JSON.parse(currentUser).idUser);
    } else {
      this.error = 'User not found in session storage';
      this.isLoading = false;
      return;
    }

    this.route.params.subscribe(params => {
      const idOrControlNumber = params['id'];
      if (/^\d+$/.test(idOrControlNumber)) {
        this.loadProfileById(parseInt(idOrControlNumber));
      } else {
        this.loadProfileByControlNumber(idOrControlNumber);
      }
    });
    this.isUpdatingFollowStatus = false;

  }

  private checkFollowStatus() {
    this.isLoading = true;
    this.relationshipService.getFollowing(this.userIdActive).subscribe({
      next: (following) => {
        this.txtFollow = following.some(f => f.idUser === this.userIdProfile) ? 'Unfollow' : 'Follow';
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al verificar estado de seguimiento';
        this.isLoading = false;
      }
    });
  }

  private loadProfileById(id: number) {
    this.isLoading = true;
    this.profileService.getProfileByUserId(id).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.setCurrentProfileImage();
        this.isLoading = false;
      }
      ,
      complete: () => {
        this.userIdProfile = this.profile?.idProfile || 0;
        this.isLoading = false;
        this.userIdActive === this.userIdProfile ? this.txtFollow = 'Edit profile' : this.checkFollowStatus();
        this.loadPosts();
      },
      error: (error) => {
        this.handleProfileError(error);
      }
    });
  }

  private loadPosts() {
    this.loading = true;
    this.postService.getPostsByUserId(this.userIdProfile, this.currentPage, this.pageSize).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.error = 'No se encontraron posts';
        } else {
          this.error = 'Error al cargar los posts';
        }
        this.loading = false;
      }
    });
  }

  protected onPostCreated(post: PostDTO) {
    this.posts.unshift(post);
  }

  protected onDeletePost(postId: number) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.post !== postId);
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      }
    });
  }

  protected loadMorePosts() {
    this.currentPage++;
    this.loadPosts();
  }

  private loadProfileByControlNumber(controlNumber: string) {
    this.isLoading = true;
    this.profileService.getProfileByControlNumber(controlNumber).subscribe({
      next: (profile: ProfileDTO) => {
        this.profile = profile;
        this.userIdProfile = this.profile?.idProfile;
        this.setCurrentProfileImage();
        this.isLoading = false;
      },
      complete: () => {
        this.userIdProfile = this.profile?.idProfile || 0;
        this.isLoading = false;
        this.userIdActive === this.userIdProfile ? this.txtFollow = 'Edit profile' : this.checkFollowStatus();
        this.loadPosts();
      },
      error: (error) => {
        this.handleProfileError(error);
      }
    });
  }

  private handleProfileError(error: any) {
    if (error.status === 404) {
      this.error = 'Perfil no encontrado';
    } else {
      this.error = 'Error al cargar el perfil';
    }
    this.isLoading = false;
  }

  private setCurrentProfileImage() {
    if (this.profile && this.profile.images) {
      this.currentProfileImage = Array.from(this.profile.images)[0];
    }
  }

  private refreshProfileData() {
    if (this.userIdProfile) {
      this.loadProfileById(this.userIdProfile);
    }
  }

  follow() {
    if (this.isUpdatingFollowStatus) return;
    if (this.txtFollow === 'Edit profile') {
      // Redirigir a la página de edición de perfil
      return;
    }
    this.isUpdatingFollowStatus = true;
    let isFollowing = this.txtFollow === 'Follow';
    const action$ = isFollowing
      ? this.relationshipService.follow(this.userIdActive, this.userIdProfile)
      : this.relationshipService.unfollow(this.userIdActive, this.userIdProfile);

    action$.pipe(
      finalize(() => {
        this.isUpdatingFollowStatus = false;
      })
    ).subscribe({
      next: (response) => {
        this.txtFollow = isFollowing ? 'Unfollow' : 'Follow';
        // Actualizamos el contador de seguidores
        if (this.profile) {
          this.profile.followersCount += isFollowing ? 1 : -1;
        }
      },
      error: (error) => {
        this.error = isFollowing
          ? 'Error al seguir al usuario'
          : 'Error al dejar de seguir al usuario';
        // Refrescamos los datos del perfil en caso de error
        this.refreshProfileData();
      }
    });
  }
}
