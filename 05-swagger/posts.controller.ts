import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus,
  HttpError,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiErrorResponse,
} from 'yasui';
import { PostsService } from './posts.service.js';
import { CreatePostDto, PostDto, PostsListDto, DeleteResponseDto } from './post.dto.js';


// This controller demonstrates Swagger documentation with YasuiJS
// 
// The EASY way: Just use DTO classes with @ApiProperty decorators!
// - Swagger is auto-generated from your routes even WITHOUT decorators
// - Add @ApiBody(DtoClass) and @ApiResponse(200, DtoClass) for typed schemas
// - That's it! No need for complex inline schemas

@Controller('/api/posts')
export class PostsController {

  constructor(
    private postsService: PostsService
  ) { }


  @ApiOperation('List all posts', 'Returns a paginated list of blog posts')
  @ApiQuery('page', 'Page number', false, Number)
  @ApiQuery('limit', 'Items per page', false, Number)
  @ApiResponse(200, PostsListDto)

  @Get('/')
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.postsService.getAll(page, limit);
  }


  @ApiOperation('Get post by ID', 'Returns a single post by its ID')
  @ApiParam('id', 'Post ID', true, Number)
  @ApiResponse(200, PostDto)
  @ApiErrorResponse(404, 'Post not found')

  @Get('/:id')
  getById(@Param('id') id: number) {
    const post = this.postsService.getById(id);
    if (!post) {
      throw new HttpError(404, 'Post not found');
    }
    return post;
  }


  @ApiOperation('Create a new post', 'Creates a new blog post and returns it')
  @ApiBody(CreatePostDto)
  @ApiResponse(201, PostDto)
  @ApiErrorResponse(400, 'Invalid post data')

  @Post('/')
  @HttpStatus(201)
  create(@Body() data: CreatePostDto) {
    if (!data.title || !data.content || !data.author) {
      throw new HttpError(400, 'Title, content, and author are required');
    }
    return this.postsService.create(data);
  }


  @ApiOperation('Delete a post', 'Deletes a post by its ID')
  @ApiParam('id', 'Post ID', true, Number)
  @ApiResponse(200, DeleteResponseDto)
  @ApiErrorResponse(404, 'Post not found')

  @Delete('/:id')
  delete(@Param('id') id: number) {
    const deleted = this.postsService.delete(id);
    if (!deleted) {
      throw new HttpError(404, 'Post not found');
    }
    return { message: 'Post deleted successfully' };
  }
}
