import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProfileDTO} from "../../../../shared/models/profile";
import {ImageProfileModel} from "../../../../shared/models/image-profile";
import {ProfileService} from "../../../../core/services/profile.service";

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

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idOrControlNumber = params['id'];

      if (/^\d+$/.test(idOrControlNumber)) {
        this.loadProfileById(parseInt(idOrControlNumber));
      } else {
        this.loadProfileByControlNumber(idOrControlNumber);
      }
    });
  }

  private loadProfileById(id: number) {
    this.isLoading = true;
    this.profileService.getProfileByUserId(id).subscribe({
      next: (profile) => {
        this.profile = profile;
        console.log(this.profile);
        this.setCurrentProfileImage();
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.error = 'Perfil no encontrado';
        }else {
          this.error = 'Error al cargar el perfil';
        }
        this.isLoading = false;
      }
    });
  }

  private loadProfileByControlNumber(controlNumber: string) {
    this.isLoading = true;
    this.profileService.getProfileByControlNumber(controlNumber).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.setCurrentProfileImage();
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.error = 'Perfil no encontrado';
        }else {
          this.error = 'Error al cargar el perfil';
        }
        this.isLoading = false;
      }
    });
  }

  private setCurrentProfileImage() {
    if (this.profile && this.profile.images) {
      this.currentProfileImage = Array.from(this.profile.images)[0];
      console.log(this.currentProfileImage);
    }
  }

  follow() {
    this.txtFollow = this.txtFollow === 'Follow' ? 'Unfollow' : 'Follow';
    // Aquí podrías implementar la lógica real de seguir/dejar de seguir
  }
}
