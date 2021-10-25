import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }

    return found;
  }

  // getTaskBySearch(filterTaskDto: FilterTaskDto) {
  //   const { status, search } = filterTaskDto;
  //   let tasks = this.tasks;
  //   if (status) {
  //     tasks = this.tasks.filter((f) => f.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((f) => {
  //       if (f.title.includes(search) || f.description.includes(search)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   return tasks;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected < 1) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }
  }

  // updateTaskById(id: string, taskStatus: TaskStatus): Task {
  //   this.tasks = this.tasks.map((f) => {
  //     if (f.id === id) {
  //       return { ...f, status: taskStatus };
  //     } else {
  //       return f;
  //     }
  //   });
  //   const task: Task = this.getTaskById(id);
  //   return task;
  // }
}
