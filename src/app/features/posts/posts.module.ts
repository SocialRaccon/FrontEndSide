import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsRoutingModule} from "./posts-routing.module";
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PostFormComponent} from "./components/post-form/post-form.component";
import {PostCardComponent} from "./components/post-card/post-card.component";

@NgModule({
  declarations: [
    CreatePostComponent,
    UpdatePostComponent,
    PostFormComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PostsRoutingModule,
    CreatePostComponent,
    PostCardComponent
  ]
})
export class PostsModule { }
