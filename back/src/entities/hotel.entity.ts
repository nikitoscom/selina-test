import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  RelationId,
} from 'typeorm';
import { Location } from './location.entity';
@Entity()
export class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne('Location', 'activity', {
    nullable: false,
  })
  location: Location;

  @RelationId((hotel: Hotel) => hotel.location)
  locationId: number;
}
