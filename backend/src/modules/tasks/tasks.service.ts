import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskInput, Task, TasksList } from '../../graphql.schema';
import { TaskEntity } from './task.entity';
import { EditTaskDto } from './dto/edit-task.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasks: Repository<Task>
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

  async create(task: CreateTaskInput): Promise<Task> {
    const data = await this.tasks.create({
      ...task,
    });
    await this.tasks.manager.save(data);
    return data;
  }

  async edit({ id, ...task }: EditTaskDto): Promise<Task> {
    let dataToUpdate = await this.tasks.findOne({
      id,
    });

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
    } = filter || {};

    const data = await this.tasks.findAndCount({
      order: {
        [sortName]: sortDirection,
      },
      take,
      skip,
    });

    return {
      total: data[1],
      list: data[0],
    };
  }

  findOneById(id: number): Promise<Task> {
    return this.tasks.findOne(id);
  }
}
