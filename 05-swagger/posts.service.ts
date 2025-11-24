import { Injectable } from 'yasui';
import { PostDto } from './post.dto.js';


@Injectable()
export class PostsService {

  private posts: PostDto[] = [
    {
      id: 1,
      title: 'Getting Started with YasuiJS',
      content: 'YasuiJS is a lightweight framework...',
      author: 'Alice',
      publishedAt: '2024-01-10T09:00:00Z',
      views: 150,
    },
    {
      id: 2,
      title: 'Dependency Injection Explained',
      content: 'DI is a design pattern...',
      author: 'Bob',
      publishedAt: '2024-01-12T14:30:00Z',
      views: 89,
    },
  ];


  getAll(page: number = 1, limit: number = 10) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      posts: this.posts.slice(start, end),
      total: this.posts.length,
      page,
    };
  }

  getById(id: number): PostDto | undefined {
    return this.posts.find(p => p.id === id);
  }

  create(data: Omit<PostDto, 'id' | 'publishedAt' | 'views'>): PostDto {
    const post: PostDto = {
      id: Date.now(),
      ...data,
      publishedAt: new Date().toISOString(),
      views: 0,
    };
    this.posts.push(post);
    return post;
  }

  delete(id: number): boolean {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.posts.splice(index, 1);
    return true;
  }
}
