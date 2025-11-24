import { createServer } from 'yasui';
import { TasksController } from './tasks.controller.js';
import { PublicController } from './public.controller.js';


await createServer({
  controllers: [TasksController, PublicController],
  port: 3000
});


console.log(`
  Middleware Demo

  Public endpoints:
    GET http://localhost:3000/api/public/health

  Protected endpoints (require Authorization header):
    GET   http://localhost:3000/api/tasks
    POST  http://localhost:3000/api/tasks
    PATCH http://localhost:3000/api/tasks/:id/toggle

  Auth token: Bearer secret-token-123
`);
