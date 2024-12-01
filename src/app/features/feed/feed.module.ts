import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import {PostsModule} from "../posts/posts.module";
import { FeedComponent } from './feed/feed.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    PostsModule,
    FeedRoutingModule,
    FormsModule
  ],
  exports: [
    FeedRoutingModule
  ]
})
export class FeedModule { }
