import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { FilterUsersDto } from './dto/filter-users.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { TasksService } from '../tasks/tasks.service';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService
  ) {}

  @Query(returns => [User], {
    name: 'users',
  })
  @UseGuards(UsersGuard)
  async getUsers(@Args('filter') filter?: FilterUsersDto) {
    return this.usersService.findAll(filter);
  }

  @Query(returns => User, {
    name: 'user',
  })
  async findOneById(
    @Args({ name: 'id', type: () => Int }, ParseIntPipe)
    id: number
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(returns => User)
  async editUser(@Args('editUser') args: EditUserDto): Promise<User> {
    const newUser = await this.usersService.edit(args);
    pubSub.publish('userEdited', { userEdited: newUser });
    return newUser;
  }

  @Subscription(returns => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
