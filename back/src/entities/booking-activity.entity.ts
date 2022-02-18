import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { Activity } from './activity.entity';
import { Location } from './location.entity';

@Entity()
export class BookingActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Activity', 'booking_activity', {
    nullable: false,
  })
  activity: Activity;

  @RelationId((booking: BookingActivity) => booking.activity)
  activityId: number;

  @ManyToOne('User', 'booking_activity', {
    nullable: false,
  })
  user: User;

  @RelationId((booking: BookingActivity) => booking.user)
  userId: number;

  @Column({ type: 'date' })
  date: string;
}
