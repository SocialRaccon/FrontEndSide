import {Component, EventEmitter, HostListener, inject, OnInit, Output} from '@angular/core';
import {AuthService} from "@core/services/auth/auth.service";
import {ProfileService} from "@core/services/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private router = inject(Router);
  @Output() menuToggle = new EventEmitter<void>();
  isUserMenuOpen = false;
  userid = this.authService.currentUserValue?.idUser;
  profileImage = "";

  constructor() {
  }

  ngOnInit() {
    this.getProfileImage();
  }

  toggleMenu() {
    this.menuToggle.emit();
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

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logoutUser() {
    this.authService.logout();
  }

  handleRoute(route: string): void {
    this.router.navigate([route]);
  }
}
