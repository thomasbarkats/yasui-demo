import { Controller, Get, Post, Patch, Param, Body, HttpStatus, HttpError } from 'yasui';
import { TasksService } from './tasks.service.js';
import { AuthMiddleware } from './auth.middleware.js';


// Auth middleware applied to entire controller
@Controller('/api/tasks', AuthMiddleware)
export class TasksController {

  constructor(
    private tasksService: TasksService
  ) { }


  @Get('/')
  getAll() {
    return this.tasksService.getAll();
  }

  @Post('/')
  @HttpStatus(201)
  create(@Body() data: { title: string }) {
    return this.tasksService.create(data.title);
  }

  @Patch('/:id/toggle')
  toggle(@Param('id') id: number) {
    const task = this.tasksService.toggle(id);
    if (!task) {
      throw new HttpError(404, 'Task not found');
    }
    return task;
  }
}
