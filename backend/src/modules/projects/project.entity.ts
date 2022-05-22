import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { getRandomOfColors } from '../../utils';

@Entity({ name: 'project', schema: 'public' })
export class ProjectEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'character varying', nullable: false })
  name: string;

  @Column({ type: 'character varying', nullable: false, unique: true })
  code: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true, update: false })
  onCreated: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  onUpdated: Date;

  @Column({ type: 'character varying', nullable: true })
  description: string;

  @Column({ type: 'character varying', nullable: true, default: getRandomOfColors() })
  accentColor: string;

  @BeforeUpdate()
  updateDates() {
    this.onUpdated = new Date();
  }
}
