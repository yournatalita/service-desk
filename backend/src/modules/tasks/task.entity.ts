import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Project } from '../projects/project.entity';
import { StatusType, TaskEnumDefaults } from './tasks.enums';
import { User } from '../users/user.entity';


@Entity({ name: 'task', schema: 'public' })
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(type => ID)
  id!: number;

  @Field()
  @Column({ type: 'character varying', nullable: false })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'character varying', nullable: false })
  description?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp', nullable: true, update: false })
  onCreated: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  onUpdated: Date;

  @Field()
  @ManyToOne(() => Project, project => project.tasks, {
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Field(type => User)
  @ManyToOne(() => User, user => user.createdTasks, {
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  creatorUser: User;

  @Field(type => User)
  @ManyToOne(() => User, user => user.assignedTasks, {
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_assigned_id' })
  assignedToUser: User;

  @Field({ defaultValue: 'open' })
  @Column({ type: 'character varying', nullable: false, default: TaskEnumDefaults.DEFAULT_STATUS })
  status: StatusType;

  @BeforeUpdate()
  updateDates?() {
    this.onUpdated = new Date();
  }
}

@ObjectType()
export class TasksList {
  @Field(type => [Task])
  list: Task[];

  @Field()
  total: number;
}
