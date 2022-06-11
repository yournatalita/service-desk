import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { FilterUsersDto } from './dto/filter-users.dto';
import { Task } from '../tasks/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {
    this.DEFAULT_DIRECTION = 'DESC';
    this.DEFAULT_SORT = 'onCreated';
    this.DEFAULT_TAKE = 20;
    this.DEFAULT_SKIP = 0;
  }

  DEFAULT_DIRECTION;
  DEFAULT_SORT;
  DEFAULT_TAKE;
  DEFAULT_SKIP;

  async create(user: CreateUserDto): Promise<User> {
    const data = await this.userRepository.create({
      ...user,
    });
    await this.userRepository.manager.save(data);
    return data;
  }

  async edit({ externalId, ...rest }: EditUserDto): Promise<User> {
    let dataToUpdate = await this.userRepository.findOne({
      externalId,
    });

    dataToUpdate = {
      ...dataToUpdate,
      ...rest,
    };

    return await this.userRepository.save(dataToUpdate);
  }

  async findAll(filter: FilterUsersDto): Promise<User[]> {
    const {
      sortName = this.DEFAULT_SORT,
      sortDirection = this.DEFAULT_DIRECTION,
      take = this.DEFAULT_TAKE,
      skip = this.DEFAULT_SKIP,
    } = filter || {};

    return await this.userRepository.find({
      order: {
        [sortName]: sortDirection,
      },
      take,
      skip,
      relations: ['project'],
    });
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByIdWithTasks(id: number): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: ['tasks'],
    });
  }
}
