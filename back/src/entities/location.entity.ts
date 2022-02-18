import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Country } from './country.enum';
@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, length: 2 })
  country: Country;
}
