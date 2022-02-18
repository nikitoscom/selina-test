import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Connection } from 'typeorm';
import { CreateActivityBookingDto } from './dto/create-activity-booking.dto';
import { CreateHotelBookingDto } from './dto/create-hotel-booking.dto';
import { GetActivitiesFilterDto } from './dto/get-activities-filter.dto';
import { GetAvailableRoomsInHotelForDatesDto } from './dto/get-available-rooms-in-hotel-for-dates.dto';
import { GetAvailableTypesDto } from './dto/get-available-types.dto';
import { GetLocationsFilterDto } from './dto/get-locations-filter.dto';
import { GetTopLocationsDto } from './dto/get-top-locations.dto';
import { Activity } from './entities/activity.entity';
import { BookingActivity } from './entities/booking-activity.entity';
import { BookingHotel } from './entities/booking-hotel.entity';
import { Location } from './entities/location.entity';
import { Room } from './entities/room.entity';
import { User } from './entities/user.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(BookingActivity)
    private readonly bookingActivityRepository: Repository<BookingActivity>,
    private connection: Connection,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAllAvailableTypesOfRoomForLocation(
    filterDTO: GetAvailableTypesDto,
  ): Promise<object> {
    const { locationId, date } = filterDTO;
    const totalRoom = await this.locationRepository.query(`
    SELECT r.type, COUNT(1) as available
    FROM room r 
    LEFT JOIN hotel h
    ON r.hotelId = h.id
    LEFT JOIN 
    booking_hotel bh
    ON bh.roomId = r.id AND bh.date = '${date}'      
    WHERE 
    h.locationId = ${locationId} AND bh.date IS NULL
    GROUP BY r.type`);
    return totalRoom;
  }

  async findRoomsInHotelForDates(
    filterDTO: GetAvailableRoomsInHotelForDatesDto,
  ): Promise<object> {
    const { start, end, hotelId } = filterDTO;
    const totalRoom = await this.locationRepository.query(`
    SELECT * from (SELECT r.id, r.type, bh.date
    FROM room r 
    LEFT JOIN hotel h
    ON r.hotelId = h.id
    LEFT JOIN 
    booking_hotel bh
    ON bh.roomId = r.id AND bh.date BETWEEN '${start}' AND '${end}'       
    WHERE 
    h.id = ${hotelId}) a WHERE a.date IS NULL`);
    return totalRoom;
  }

  async findTopLocations(filterDTO: GetTopLocationsDto): Promise<object> {
    const { date } = filterDTO;
    const totalRoom = await this.locationRepository.query(`
    SELECT h.locationId, COUNT(1) as total
    FROM booking_hotel b, room r
    LEFT JOIN hotel h
    ON r.hotelId = h.id
    WHERE 
    b.date = '${date}' AND
    r.id = b.roomId
    GROUP BY h.locationId`);
    return totalRoom;
  }

  async findAllLocations(
    filterDTO: GetLocationsFilterDto,
  ): Promise<Location[]> {
    const { country, order } = filterDTO;
    const query = this.locationRepository.createQueryBuilder('locations');
    if (country) {
      query.andWhere('locations.country = :country', { country });
    }
    if (order) {
      query.orderBy('locations.country', order === 'ASC' ? 'ASC' : 'DESC');
    }
    return await query.getMany();
  }

  async findAllActivities(
    filterDTO: GetActivitiesFilterDto,
  ): Promise<Activity[]> {
    const { country } = filterDTO;

    const result = await this.activityRepository.query(
      `SELECT a.*
      FROM activity a, location l 
      WHERE l.id = a.locationId AND l.country = '${country}'
    `,
    );
    return result;
  }

  async createActivityBooking(
    createActivityBookingDto: CreateActivityBookingDto,
  ): Promise<BookingActivity> {
    const user = new User();
    user.id = createActivityBookingDto.userId;

    const activity = new Activity();
    activity.id = createActivityBookingDto.activityId;

    const activityBooking = this.bookingActivityRepository.create({
      ...createActivityBookingDto,
      user,
      activity,
    });
    return this.bookingActivityRepository.save(activityBooking);
  }

  async createHotelBooking(
    createHotelBookingDto: CreateHotelBookingDto,
  ): Promise<boolean> {
    const { start, end, roomId, userId } = createHotelBookingDto;
    const queryRunner = this.connection.createQueryRunner();

    const user = new User();
    user.id = userId;
    const room = new Room();
    room.id = roomId;

    const dateRangeArr = this.getDaysArray(start, end);

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      dateRangeArr.forEach(async (date) => {
        const stay = new BookingHotel();
        stay.room = room;
        stay.user = user;
        stay.date = date;
        await queryRunner.manager.save(stay);
      });

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  getDaysArray = (start, end) => {
    const arr = [];
    for (
      let dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toISOString().substring(0, 10));
    }
    return arr;
  };
}
