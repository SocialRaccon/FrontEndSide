// src/app/features/feed/feed/feed.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  newPostContent: string = '';
  posts: any[] = []; // Aquí deberías tener la lista de posts

  // Variable para almacenar la imagen seleccionada
  selectedImage: any;

  // Función para manejar la selección de la imagen
  onImageSelected(event: any): void {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      // Validar el tipo de archivo, por ejemplo, solo imágenes
      if (file.type.startsWith('image/')) {
        this.selectedImage = file;
      } else {
        // Mostrar un error si no es una imagen válida
        console.error('Por favor selecciona una imagen');
      }
    }
  }

  // Función para agregar un post (esto debería estar conectado con tu backend)
  addPost(): void {
    console.log('Contenido del post:', this.newPostContent);
    console.log('Imagen seleccionada:', this.selectedImage);

    if (this.newPostContent.length < 10) {
      console.log('El contenido es demasiado corto');
      return;
    }

    const newPost = {
      content: this.newPostContent,
      image: this.selectedImage ? URL.createObjectURL(this.selectedImage) : null,
      likes: 0,
      comments: [],
      showCommentBox: false,
      newComment: ''
    };

    this.posts.push(newPost);
    console.log('Nuevo post agregado:', newPost);

    this.newPostContent = '';
    this.selectedImage = null;
  }

  // Función para manejar el comentario en un post
  commentOnPost(postId: number, comment: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments.push({ username: 'Usuario', comment });
      post.newComment = ''; // Limpiar el campo de comentario
    }
  }

  // Función para mostrar/ocultar el cuadro de comentario
  toggleCommentBox(postId: number): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.showCommentBox = !post.showCommentBox;
    }
  }

  // Función para darle "Me gusta" a un post
  likePost(postId: number): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes++;
    }
  }
}
