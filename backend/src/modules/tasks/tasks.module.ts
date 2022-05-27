import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { ProjectsModule } from '../projects/projects.module';
import { Project } from '../projects/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
    forwardRef(() => ProjectsModule),
  ],
  providers: [TasksService, TasksResolver],
  exports: [TasksService],
  controllers: [],
})
export class TasksModule {}
