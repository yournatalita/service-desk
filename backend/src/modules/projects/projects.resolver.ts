import { ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
  Int,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { ProjectsGuard } from './projects.guard';
import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { EditProjectDto } from './dto/edit-project.dto';
import { Project } from './project.entity';
import { TasksList } from '../tasks/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { FilterDto } from '../tasks/dto/filter.dto';

const pubSub = new PubSub();

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService
  ) {}

  @Query(returns => [Project], {
    name: 'projects',
  })
  @UseGuards(ProjectsGuard)
  async getProjects() {
    return this.projectsService.findAll();
  }

  @Query(returns => Project, {
    name: 'project',
  })
  async findOneById(
    @Args({ name: 'id', type: () => Int }, ParseIntPipe)
    id: number
  ): Promise<Project> {
    return this.projectsService.findOneById(id);
  }

  @Mutation(returns => Project)
  async createProject(@Args('createProjectInput') args: CreateProjectDto): Promise<Project> {
    const newProject = await this.projectsService.create({
      ...args,
    });
    pubSub.publish('projectCreated', { projectCreated: newProject });
    return newProject;
  }

  @Mutation(returns => Project)
  async editProject(
    @Args('editProjectInput') args: EditProjectDto
  ): Promise<Omit<Project, 'updateDates'>> {
    const newProject = await this.projectsService.edit({
      ...args,
    });
    pubSub.publish('projectEdited', { projectEdited: newProject });
    return newProject;
  }

  @Subscription(returns => Project)
  projectCreated() {
    return pubSub.asyncIterator('projectCreated');
  }

  @ResolveField('tasks', returns => TasksList)
  async getProject(
    @Parent() project: Project,
    @Args('filter', { nullable: true }) filter?: FilterDto
  ) {
    const { id } = project;

    return await this.tasksService.findAll({ projectId: id, ...filter });
  }
}
