// sidebar.component.ts
import {Component, inject, Input, OnInit} from '@angular/core';
import {AuthService} from "@core/services/auth/auth.service";
import {ProfileService} from "@core/services/profile.service";
import {UserDTO} from "../../shared/models/user";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  user? = this.authService.currentUserValue;
  userid = this.user?.idUser;
  profileImage = "";
  username: string = this.user?.name + ' ' + this.user?.lastName + ' ' + this.user?.secondLastName;
  controlNumber?: string = this.user?.controlNumber;

  ngOnInit() {
    this.getProfileImage();
  }

  getProfileImage() {
    if (!this.userid) {
      return;
    }
    this.profileService.getProfile(this.userid).subscribe({
        next: (profile) => {
          if (!profile.images || profile.images.size === 0) {
            return;
          }
          this.profileImage = Array.from(profile.images.values())[0].imageThumbnailUrl;
          console.log('Profile image', profile);
        },
        error: (error) => {
          console.error('Error getting profile image', error);
        }
      }
    );
  }
}
