import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { RoomType } from './room-type.enum';
@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Hotel', 'room', {
    nullable: false,
  })
  hotel: Hotel;

  @RelationId((room: Room) => room.hotel)
  hotelId: number;

  @Column({ nullable: false })
  type: RoomType;
}
