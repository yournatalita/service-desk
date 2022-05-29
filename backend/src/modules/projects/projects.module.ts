import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { Task } from '../tasks/task.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task]), forwardRef(() => TasksModule)],
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService],
  controllers: [],
})
export class ProjectsModule {}
