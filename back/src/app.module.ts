import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingHotel } from './entities/booking-hotel.entity';
import { User } from './entities/user.entity';
import { Room } from './entities/room.entity';
import { BookingActivity } from './entities/booking-activity.entity';
import { Location } from './entities/location.entity';
import { Activity } from './entities/activity.entity';
import { Hotel } from './entities/hotel.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'selina',
      entities: [
        Activity,
        BookingActivity,
        BookingHotel,
        Hotel,
        Location,
        Room,
        User,
      ],
      synchronize: true,
      logging: 'all',
    }),
    TypeOrmModule.forFeature([Location, Activity, BookingActivity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
