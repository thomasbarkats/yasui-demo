import { Injectable } from 'yasui';


interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TasksService {

  private tasks: Task[] = [
    { id: 1, title: 'Prepare presentation', completed: false },
    { id: 2, title: 'Write demo code', completed: true },
    { id: 3, title: 'Practice demo', completed: false },
  ];

  getAll(): Task[] {
    return this.tasks;
  }

  create(title: string): Task {
    const task = { id: Date.now(), title, completed: false };
    this.tasks.push(task);
    return task;
  }

  toggle(id: number): Task | undefined {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    return task;
  }
}
