import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { Task } from '../tasks/task.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), forwardRef(() => TasksModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  controllers: [],
})
export class UsersModule {}
