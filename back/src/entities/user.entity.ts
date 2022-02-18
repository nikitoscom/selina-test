import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;
}
