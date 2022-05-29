import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { getRandomOfColors } from '../../utils';
import { Task } from '../tasks/task.entity';

@Entity({ name: 'project', schema: 'public' })
@ObjectType()
export class Project {
  @Field(type => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ type: 'character varying', nullable: false })
  name: string;

  @Field()
  @Column({ type: 'character varying', nullable: false, unique: true })
  code: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp', nullable: true, update: false })
  onCreated: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  onUpdated: Date;

  @Field()
  @Column({ type: 'character varying', nullable: true })
  description: string;

  @Field()
  @Column({ type: 'character varying', nullable: true, default: getRandomOfColors() })
  accentColor: string;

  @Field(type => [Task])
  @OneToMany(() => Task, task => task.project, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'task_id' })
  tasks: Task[];

  @BeforeUpdate()
  updateDates?() {
    this.onUpdated = new Date();
  }
}
