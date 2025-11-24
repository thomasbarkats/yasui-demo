import { AP, ApiSchema } from 'yasui';


// DTOs with @ApiProperty decorators for automatic Swagger schema generation
// This is the EASY way - just decorate your class properties!

@ApiSchema('Post')
export class PostDto {
  @AP() id!: number;
  @AP() title!: string;
  @AP() content!: string;
  @AP() author!: string;
  @AP() publishedAt!: string;
  @AP() views!: number;
}

@ApiSchema('Create Post')
export class CreatePostDto {
  @AP() title!: string;
  @AP() content!: string;
  @AP() author!: string;
}

@ApiSchema('Posts List')
export class PostsListDto {
  @AP([PostDto]) posts!: PostDto[];
  @AP() total!: number;
  @AP() page!: number;
}

@ApiSchema('Delete Response')
export class DeleteResponseDto {
  @AP() message!: string;
}
