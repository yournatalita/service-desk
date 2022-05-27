import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from './project.entity';
import { EditProjectDto } from './dto/edit-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  async create(project: CreateProjectDto): Promise<Project> {
    return await this.projectsRepository.save({
      ...project,
    });
  }

  async edit({ id, ...project }: EditProjectDto): Promise<Omit<Project, 'updateDates'>> {
    let dataToUpdate = await this.projectsRepository.findOne({
      id,
    });

    // @ts-ignore
    dataToUpdate = {
      ...dataToUpdate,
      ...project,
    };

    return await this.projectsRepository.save(dataToUpdate);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }

  async findOneById(id: number): Promise<Project> {
    return this.projectsRepository.findOne(id);
  }
}
