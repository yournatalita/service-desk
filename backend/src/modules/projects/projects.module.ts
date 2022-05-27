import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService],
  controllers: [],
})

export class ProjectsModule {}
