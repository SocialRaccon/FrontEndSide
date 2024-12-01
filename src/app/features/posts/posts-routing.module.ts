import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import {PostFormComponent} from "./components/post-form/post-form.component";

const routes: Routes = [
  { path: 'create', component: CreatePostComponent }, // Ruta para crear un nuevo post
  { path: 'update', component: UpdatePostComponent }, // Ruta para actualizar un post
  { path: 'post-from', component: PostFormComponent } // Ruta para el formulario de un post
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Registra las rutas del módulo
  exports: [RouterModule]
})
export class PostsRoutingModule { }
