import 'dotenv/config';
import { Connection } from 'typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TaskEntity } from './modules/tasks/task.entity';
import { DateScalar } from './common/scalars/date.scalar';
import { ProjectEntity } from './modules/projects/project.entity';

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'service-desk',
      entities: [TaskEntity, ProjectEntity],
      logging: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  providers: [DateScalar],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
