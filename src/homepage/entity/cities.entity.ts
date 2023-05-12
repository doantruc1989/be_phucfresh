import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Districts } from './districts.entity';

@Entity('cities')
export class Cities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  cities: string;

  @OneToMany(() => Districts, (district) => district.city)
  district: Districts[];
}
