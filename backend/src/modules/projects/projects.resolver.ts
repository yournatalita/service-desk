import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Project } from '../../graphql.schema';
import { ProjectsGuard } from './projects.guard';
import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { EditProjectDto } from './dto/edit-project.dto';

const pubSub = new PubSub();

@Resolver('Project')
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query('projects')
  @UseGuards(ProjectsGuard)
  async getTasks() {
    return this.projectsService.findAll();
  }

  @Query('project')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number
  ): Promise<Project> {
    return this.projectsService.findOneById(id);
  }

  @Mutation('createProject')
  async create(@Args('createProjectInput') args: CreateProjectDto): Promise<Project> {
    const newProject = await this.projectsService.create({
      ...args,
    });
    pubSub.publish('projectCreated', { projectCreated: newProject });
    return newProject;
  }

  @Mutation('editProject')
  async edit(@Args('editProjectInput') args: EditProjectDto): Promise<Project> {
    const newProject = await this.projectsService.edit({
      ...args,
    });
    pubSub.publish('projectEdited', { projectEdited: newProject });
    return newProject;
  }

  @Subscription('taskCreated')
  taskCreated() {
    return pubSub.asyncIterator('taskCreated');
  }
}
