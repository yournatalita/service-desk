import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from '../tasks/task.entity';

@Entity({ name: 'user', schema: 'public' })
@ObjectType()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(type => ID)
  @Column({ type: 'character varying' })
  externalId: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp', nullable: true, update: false })
  onCreated: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  onUpdated: Date;

  @Field(type => [Task])
  @OneToMany(() => Task, task => task.creatorUser, {
    createForeignKeyConstraints: true,
  })
  createdTasks: Task[];

  @Field(type => [Task])
  @OneToMany(() => Task, task => task.assignedToUser, {
    createForeignKeyConstraints: true,
  })
  assignedTasks: Task[];

  @BeforeUpdate()
  updateDates?() {
    this.onUpdated = new Date();
  }
}
