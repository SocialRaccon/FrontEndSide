import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import {PostsModule} from "../posts/posts.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostsModule
  ],
  exports: [
    FeedRoutingModule
  ]
})
export class FeedModule { }
