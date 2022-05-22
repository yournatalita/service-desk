import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Task } from '../../graphql.schema';
import { TasksGuard } from './tasks.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { FilterDto } from './dto/filter.dto';

const pubSub = new PubSub();

@Resolver('Task')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query('tasks')
  @UseGuards(TasksGuard)
  async getTasks(@Args('filter') filter: FilterDto) {
    return this.tasksService.findAll(filter);
  }

  @Query('task')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number
  ): Promise<Task> {
    return this.tasksService.findOneById(id);
  }

  @Mutation('createTask')
  async create(@Args('createTaskInput') args: CreateTaskDto): Promise<Task> {
    const newTask = await this.tasksService.create({
      ...args,
    });
    pubSub.publish('taskCreated', { taskCreated: newTask });
    return newTask;
  }

  @Mutation('editTask')
  async edit(@Args('editTaskInput') args: EditTaskDto): Promise<Task> {
    const newTask = await this.tasksService.edit({
      ...args,
    });
    pubSub.publish('taskEdited', { taskEdited: newTask });
    return newTask;
  }

  @Subscription('taskCreated')
  taskCreated() {
    return pubSub.asyncIterator('taskCreated');
  }
}
