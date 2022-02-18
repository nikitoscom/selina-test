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
import { Room } from './room.entity';

@Entity()
@Unique('index_room_date', ['room', 'date'])
export class BookingHotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Room', 'booking_hotel', {
    nullable: false,
  })
  room: Room;

  @RelationId((booking: BookingHotel) => booking.room)
  roomId: number;

  @ManyToOne('User', 'booking_hotel', {
    nullable: false,
  })
  user: User;

  @RelationId((booking: BookingHotel) => booking.user)
  userId: number;

  @Column({ type: 'date' })
  date: string;

  // Price value is another story
  // @Column({ default: 0 })
  // price: number;
}
