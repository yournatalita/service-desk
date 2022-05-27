import 'dotenv/config';
import { Connection } from 'typeorm';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';

import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { Task } from './modules/tasks/task.entity';
import { Project } from './modules/projects/project.entity';

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'service-desk',
      entities: [Task, Project],
      logging: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
