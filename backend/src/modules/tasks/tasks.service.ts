import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, In, MoreThan, Repository } from 'typeorm';

import { Task, TasksList } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { FilterDto } from './dto/filter.dto';
import { Project } from '../projects/project.entity';
import { TaskEnums } from './tasks.enums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasks: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {
    this.DEFAULT_DIRECTION = 'DESC';
    this.DEFAULT_SORT = 'onUpdated';
    this.DEFAULT_TAKE = 20;
    this.DEFAULT_SKIP = 0;
  }

  DEFAULT_DIRECTION;
  DEFAULT_SORT;
  DEFAULT_TAKE;
  DEFAULT_SKIP;

  async create(task: CreateTaskDto): Promise<Task> {
    const project = await this.projectsRepository.findOne(task.projectId);
    const data = await this.tasks.create({
      ...task,
      project,
    });
    await this.tasks.manager.save(data);
    return data;
  }

  async edit({ id, ...task }: EditTaskDto): Promise<Task> {
    let dataToUpdate = await this.tasks.findOne(
      {
        id,
      },
      {
        relations: ['project'],
      }
    );

    dataToUpdate = {
      ...dataToUpdate,
      ...task,
    };

    return await this.tasks.save(dataToUpdate);
  }

  async findAll(filter: FilterDto): Promise<TasksList> {
    const {
      sortName = this.DEFAULT_SORT,
      sortDirection = this.DEFAULT_DIRECTION,
      take = this.DEFAULT_TAKE,
      skip = this.DEFAULT_SKIP,
      statusState,
      projectId,
    } = filter || {};

    let where: FindConditions<Task> = {};

    if (statusState) {
      where.status = In(TaskEnums.STATUS_STATES[statusState]);
    }

    if (projectId) {
      where.project = {
        id: projectId,
      };
    }

    const data = await this.tasks.findAndCount({
      order: {
        [sortName]: sortDirection,
      },
      take,
      skip,
      where,
      relations: ['project'],
    });

    return {
      total: data[1],
      list: data[0],
    };
  }

  async findAllByProjectId({ projectId }: FilterDto): Promise<TasksList> {
    const data = await this.tasks.findAndCount({
      where: {
        project: {
          id: projectId,
        },
      },
      relations: ['project'],
    });

    return {
      total: data[1],
      list: data[0],
    };
  }

  findOneById(id: number): Promise<Task> {
    return this.tasks.findOne(id, {
      relations: ['project'],
    });
  }
}
