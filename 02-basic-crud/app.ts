import { createServer } from 'yasui';
import { UsersController } from './users.controller.js';


await createServer({
  controllers: [UsersController],
  port: 3000
});


console.log(`
  Basic CRUD Demo

  Available endpoints:
    GET    http://localhost:3000/api/users
    GET    http://localhost:3000/api/users/:id
    POST   http://localhost:3000/api/users
    DELETE http://localhost:3000/api/users/:id
`);
