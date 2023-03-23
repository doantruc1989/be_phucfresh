import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar', { length: 10000 })
  text: string;

  @Column('varchar')
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
