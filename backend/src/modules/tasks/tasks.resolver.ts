import { ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { TasksGuard } from './tasks.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { FilterDto } from './dto/filter.dto';
import { Project } from '../projects/project.entity';
import { Task, TasksList } from './task.entity';
import { ProjectsService } from '../projects/projects.service';

const pubSub = new PubSub();

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectsService: ProjectsService
  ) {}

  @Query(returns => TasksList, {
    name: 'tasks',
  })
  @UseGuards(TasksGuard)
  async getTasks(@Args('filter') filter: FilterDto) {
    return this.tasksService.findAll(filter);
  }

  @Query(returns => Task, {
    name: 'task',
  })
  async findOneById(
    @Args({ name: 'id', type: () => Int }, ParseIntPipe)
    id: number
  ): Promise<Task> {
    return this.tasksService.findOneById(id);
  }

  @Mutation(returns => Task)
  async createTask(@Args('createTaskInput') args: CreateTaskDto): Promise<Task> {
    const newTask = await this.tasksService.create({
      ...args,
    });
    pubSub.publish('taskCreated', { taskCreated: newTask });
    return newTask;
  }

  @Mutation(returns => Task)
  async editTask(@Args('editTaskInput') args: EditTaskDto): Promise<Task> {
    const newTask = await this.tasksService.edit({
      ...args,
    });
    pubSub.publish('taskEdited', { taskEdited: newTask });
    return newTask;
  }

  @Subscription(returns => Task)
  taskCreated() {
    return pubSub.asyncIterator('taskCreated');
  }

  @ResolveField('project', returns => Project)
  async getProject(@Parent() task: Task) {
    const { project } = task;

    return await this.projectsService.findOneById(project.id);
  }
}
