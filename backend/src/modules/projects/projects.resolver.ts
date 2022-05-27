import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { ProjectsGuard } from './projects.guard';
import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { EditProjectDto } from './dto/edit-project.dto';
import { Project } from './project.entity';

const pubSub = new PubSub();

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query((returns) => [Project], {
    name: 'projects',
  })
  @UseGuards(ProjectsGuard)
  async getProjects() {
    return this.projectsService.findAll();
  }

  @Query((returns) => Project, {
    name: 'project',
  })
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number
  ): Promise<Project> {
    return this.projectsService.findOneById(id);
  }

  @Mutation((returns) => Project)
  async createProject(@Args('createProjectInput') args: CreateProjectDto): Promise<Project> {
    const newProject = await this.projectsService.create({
      ...args,
    });
    pubSub.publish('projectCreated', { projectCreated: newProject });
    return newProject;
  }

  @Mutation((returns) => Project)
  async editProject(
    @Args('editProjectInput') args: EditProjectDto
  ): Promise<Omit<Project, 'updateDates'>> {
    const newProject = await this.projectsService.edit({
      ...args,
    });
    pubSub.publish('projectEdited', { projectEdited: newProject });
    return newProject;
  }

  @Subscription((returns) => Project)
  projectCreated() {
    return pubSub.asyncIterator('projectCreated');
  }
}
