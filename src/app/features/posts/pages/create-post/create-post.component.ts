import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {PostDTO} from "../../../../shared/models/post";
import {PostService} from "@core/services/post.service";
import {AuthService} from "@core/services/auth/auth.service";
import {LoadingService} from "@core/services/loading.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter<PostDTO>();
  postForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    public loadingService: LoadingService
  ) {
    this.postForm = this.fb.group({
      postDescription: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  onSubmit() {
    if (this.postForm.valid && this.authService.currentUserValue) {
      this.loadingService.show();
      const userId = this.authService.currentUserValue.idUser;
      const description = this.postForm.get('postDescription')?.value;

      const createPost$ = this.selectedFiles.length > 0
        ? this.postService.createPostWithImages(userId, description, this.selectedFiles)
        : this.postService.createPost(userId, description);

      createPost$.subscribe({
        next: (post) => {
          this.postCreated.emit(post);
          this.postForm.reset();
          this.selectedFiles = [];
        },
        error: (error) => {
          console.error('Error creating post:', error);
        },
        complete: () => {
          this.loadingService.hide();
        }
      });
    }
  }
}
