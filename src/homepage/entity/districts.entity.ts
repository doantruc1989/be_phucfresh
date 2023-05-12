import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cities } from './cities.entity';

@Entity('districts')
export class Districts {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar')
  districts: string;

  @Column('varchar', { length: 15000 })
  wards: string;

  // @ManyToOne(() => Cities, (city) => city.district, {
  //   onDelete: 'CASCADE',
  // })
  // city: Cities;

}
