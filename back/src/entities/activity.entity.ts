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
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne('Location', 'activity', {
    nullable: false,
  })
  location: Location;

  @RelationId((activity: Activity) => activity.location)
  locationId: number;
}
