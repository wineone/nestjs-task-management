import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRespository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const userMock: User = {
  id: 'someId',
  username: 'matheus',
  password: 'peloamordedeus',
  tasks: [],
};

const taskMock: Task = {
  id: 'someString',
  title: 'someTitle',
  description: 'someDescription',
  status: TaskStatus.OPEN,
  user: userMock,
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRespository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('testing if the tasksService.getTasks get the same result', async () => {
      // expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('SomeValue');
      const result = await tasksService.getTasks(null, userMock);
      // expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('SomeValue');
    });
  });

  describe('getTaskById', () => {
    it('testing if the getTaskById find the object', async () => {
      tasksRepository.findOne.mockResolvedValue(taskMock);
      expect(await tasksService.getTaskById('someString', userMock)).toEqual(
        taskMock,
      );
    });

    it('testing if the getTaskById throw an exception when', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', userMock)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
