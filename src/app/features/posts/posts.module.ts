import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from "./posts-routing.module";
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { PostFormComponent } from "./components/post-form/post-form.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CreatePostComponent,
    UpdatePostComponent,
    PostFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule
  ],
  exports: [
    CreatePostComponent,
    UpdatePostComponent,
    PostFormComponent
  ]
})
export class PostsModule { }
