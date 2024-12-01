// src/app/features/feed/feed.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts = [
    {
      id: 1,
      content: '¡Hola, este es un post de prueba!',
      image: 'https://via.placeholder.com/600x300',
      likes: 5,
      comments: [
        { username: 'usuario1', comment: '¡Qué genial!' },
        { username: 'usuario2', comment: 'Me gusta mucho!' }
      ]
    },
    {
      id: 2,
      content: 'Otro post con una imagen',
      image: 'https://via.placeholder.com/600x300',
      likes: 10,
      comments: [
        { username: 'usuario3', comment: 'Excelente publicación' }
      ]
    }
  ];

  newPostContent = '';
  newPostImage = '';

  constructor() { }

  ngOnInit(): void {}

  addPost(): void {
    if (this.newPostContent.trim()) {
      this.posts.unshift({
        id: this.posts.length + 1,
        content: this.newPostContent,
        image: this.newPostImage || '',
        likes: 0,
        comments: []
      });

      // Limpiar el formulario
      this.newPostContent = '';
      this.newPostImage = '';
    }
  }

  likePost(postId: number): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes++;
    }
  }

  commentOnPost(postId: number, comment: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post && comment.trim()) {
      post.comments.push({ username: 'usuarioX', comment });
    }
  }
}
