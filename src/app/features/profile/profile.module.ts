import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import {PostsModule} from "../posts/posts.module";
import {PostCardComponent} from "../posts/components/post-card/post-card.component";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PostsModule,
  ],
  exports : [
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
