import { Injectable } from 'yasui';


interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {

  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];


  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  create(data: Omit<User, 'id'>): User {
    const user = { id: Date.now(), ...data };
    this.users.push(user);
    return user;
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
