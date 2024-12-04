// src/app/features/feed/feed/feed.component.ts
import {Component, OnInit} from '@angular/core';
import {CurrentUserDTO} from "../../../shared/models/user";
import {PostDTO} from "../../../shared/models/post";
import {PostService} from "@core/services/post.service";
import {UserService} from "@core/services/user.service";
import {AuthService} from "@core/services/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: PostDTO[] = [];
  currentUser: CurrentUserDTO | null = null;
  loading = false;
  page = 0;
  size = 5;
  hasMorePosts = true;

  constructor(private postService: PostService) {
    // Obtener usuario actual del SessionStorage
    const userStr = sessionStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
    this.loadInitialPosts();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }

  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
      this.loadMorePosts();
    }
  }

  loadInitialPosts() {
    this.page = 0;
    this.posts = [];
    this.hasMorePosts = true;
    this.loadMorePosts();
  }

  loadMorePosts() {
    if (this.loading || !this.hasMorePosts) return;
    this.loading = true;
    this.postService.getFeed(this.page, this.size).subscribe({
      next: (data) => {
        this.posts.push(...data);
        console.log('Posts loaded:', data);
        this.page++;
        this.loading = false;
        this.hasMorePosts = data.length === this.size;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Posts loaded:', this.posts);
      }
    });
  }

  onDeletePost(postId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.post !== postId);
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
    }
  }

  trackByPost(index: number, post: PostDTO): number {
    return post.post;
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
      this.loadMorePosts();
    }
  }
}
