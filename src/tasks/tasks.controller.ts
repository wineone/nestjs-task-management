import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UuidDto } from './dto/uuid.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query() filterTaskDto: FilterTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterTaskDto, user);
  }

  @Get('/:id')
  getTaskById(@Param() uuidDto: UuidDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(uuidDto.id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param() uuidDto: UuidDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(uuidDto.id, user);
  }

  @Patch(':id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ) {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskById(id, status, user);
  }
}
