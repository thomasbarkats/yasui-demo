import { Controller, Get, Post, Delete, Param, Body, HttpStatus, HttpError } from 'yasui';
import { UsersService } from './users.service.js';


@Controller('/api/users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }


  @Get('/')
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    const user = this.usersService.getById(id);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }
    return user;
  }

  @Post('/')
  @HttpStatus(201)
  create(@Body() data: { name: string; email: string }) {
    return this.usersService.create(data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    const deleted = this.usersService.delete(id);
    if (!deleted) {
      throw new HttpError(404, 'User not found');
    }
    return { message: 'User deleted' };
  }
}
