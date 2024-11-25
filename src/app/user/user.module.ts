import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ProfileDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
