import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from './project.entity';
import { EditProjectDto } from './dto/edit-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { Task } from '../tasks/task.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async create(project: CreateProjectDto): Promise<Project> {
    return await this.projectsRepository.save({
      ...project,
      tasks: [],
    });
  }

  async edit({ id, ...project }: EditProjectDto): Promise<Omit<Project, 'updateDates'>> {
    let dataToUpdate = await this.projectsRepository.findOne({
      id,
    });

    dataToUpdate = {
      ...dataToUpdate,
      ...project,
    };

    return await this.projectsRepository.save(dataToUpdate);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      relations: ['tasks'],
    });
  }

  async findOneById(id: number): Promise<Project> {
    return this.projectsRepository.findOne(id);
  }
}
