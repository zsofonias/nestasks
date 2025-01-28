import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { User } from 'src/user/entities/user.entity';
import { TaskCategory } from 'src/task-category/entities/task-category.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ManyToOne(() => TaskCategory, { nullable: true })
  @JoinColumn()
  category: TaskCategory;

  @ManyToOne(() => User)
  user: User;
}
