import { createServer } from 'yasui';
import { PostsController } from './posts.controller.js';


await createServer({
  controllers: [PostsController],
  port: 3000,
  swagger: {
    generate: true,
    path: 'docs',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'A simple blog API built with YasuiJS - demonstrating Swagger generation',
    },
  },
});


console.log(`
  Swagger Demo - Blog API

  Swagger UI: http://localhost:3000/docs

  Available endpoints:
    GET    http://localhost:3000/api/posts
    GET    http://localhost:3000/api/posts/:id
    POST   http://localhost:3000/api/posts
    DELETE http://localhost:3000/api/posts/:id
`);
