import { IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'varchar' })
  rank: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  link: string;

  @Column({ type: 'varchar', nullable: true })
  site: string;

  @Column()
  hasUpvote: boolean;

  @Column({ type: 'varchar', nullable: true })
  points: string;

  @Column({ type: 'varchar', nullable: true })
  author: string;

  @Column({ type: 'varchar' })
  time: string;

  @Column({ type: 'varchar', nullable: true })
  comments: string;

  @CreateDateColumn({ default: () => 'now()' })
  @IsOptional()
  createdAt: Date;
}
