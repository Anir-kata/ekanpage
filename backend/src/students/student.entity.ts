import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'students' })
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ length: 100 })
  level: string;

  @Column({ length: 255 })
  objective: string;

  @Column({ type: 'int', default: 0 })
  sessionsDone: number;

  @Column({ type: 'timestamp without time zone', nullable: true })
  nextSessionAt: Date | null;

  @Column({ type: 'text', default: '' })
  notes: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}
