import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { environment } from '../../../environments/environment.development';
import { PostDTO } from '../../shared/models/post';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getFeed', () => {
    it('should make a GET request with correct URL and parameters', () => {
      const dummyPosts: PostDTO[] = [];
      service.getFeed(1, 5).subscribe(posts => {
        expect(posts).toEqual(dummyPosts);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/feed?page=1&size=5`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPosts);
    });

    it('should return an observable of PostDTO[]', () => {
      const dummyPosts: PostDTO[] = [{ post: 1, dateCreated: '', idUser: 1, userName: '', userLastName: '', userSecondLastName: '', userControlNumber: '', postDescription: '', comments: [], reactions: [], images: [] }];
      service.getFeed().subscribe(posts => {
        expect(posts.length).toBe(1);
        expect(posts).toEqual(dummyPosts);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/feed?page=0&size=10`);
      req.flush(dummyPosts);
    });
  });

    describe('#createPost', () => {
        it('should make a POST request with correct URL and form data', () => {
            const dummyPost: PostDTO = { post: 1, dateCreated: '', idUser: 1, userName: '', userLastName: '', userSecondLastName: '', userControlNumber: '', postDescription: '', comments: [], reactions: [], images: [] };
            service.createPost('Test description').subscribe(post => {
                expect(post).toEqual(dummyPost);
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body.has('postDescription')).toBeTruthy();
            expect(req.request.body.get('postDescription')).toBe('Test description');
            req.flush(dummyPost);
        });

        it('should return an observable of PostDTO', () => {
            const dummyPost: PostDTO = { post: 1, dateCreated: '', idUser: 1, userName: '', userLastName: '', userSecondLastName: '', userControlNumber: '', postDescription: '', comments: [], reactions: [], images: [] };
            service.createPost('Test description').subscribe(post => {
                expect(post).toEqual(dummyPost);
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
            req.flush(dummyPost);
        });

        it('should make a POST request with image', () => {
            const dummyPost: PostDTO = { post: 1, dateCreated: '', idUser: 1, userName: '', userLastName: '', userSecondLastName: '', userControlNumber: '', postDescription: '', comments: [], reactions: [], images: [] };
            const imageFile = new File([''], 'test-image.png', { type: 'image/png' });
            service.createPost('Test description', imageFile).subscribe(post => {
                expect(post).toEqual(dummyPost);
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body.has('image')).toBeTruthy();
            expect(req.request.body.get('image')).toBe(imageFile);
            req.flush(dummyPost);
        });
    });
});