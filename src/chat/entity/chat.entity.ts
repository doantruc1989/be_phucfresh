import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  // 'uuid'
  id: number;

  @Column()
  room: string;

  @Column()
  email?: string;

  @Column({ unique: true })
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}
