import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'task', schema: 'public' })
export class TaskEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'character varying', nullable: false })
  title: string;

  @Column({ type: 'character varying', nullable: false })
  description: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true, update: false })
  onCreated: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  onUpdated: Date;

  @Column({ type: 'bigint', nullable: false })
  projectId: number;

  @BeforeUpdate()
  updateDates() {
    this.onUpdated = new Date();
  }
}
