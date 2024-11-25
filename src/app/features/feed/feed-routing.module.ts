// src/app/features/feed/feed-routing.module.ts
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreatePostComponent} from "../posts/pages/create-post/create-post.component";
import {UpdatePostComponent} from "../posts/pages/update-post/update-post.component";

let routes: Routes = [
  {path: 'post/create', component: CreatePostComponent},
  {path: 'post/update', component: UpdatePostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {
}
