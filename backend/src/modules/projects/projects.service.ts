import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from '../../graphql.schema';
import { ProjectEntity } from './project.entity';
import { EditProjectDto } from './dto/edit-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<Project>
  ) {}

  async create(project: CreateProjectDto): Promise<Project> {
    return await this.projectsRepository.save({
      ...project,
    });
  }

  async edit({ id, ...project }: EditProjectDto): Promise<Project> {
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
    return await this.projectsRepository.find();
  }

  findOneById(id: number): Promise<Project> {
    return this.projectsRepository.findOne(id);
  }
}
