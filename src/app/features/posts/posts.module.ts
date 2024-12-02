import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsRoutingModule} from "./posts-routing.module";
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CreatePostComponent,
    UpdatePostComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
  exports: [
    PostsRoutingModule,
  ]
})
export class PostsModule { }
