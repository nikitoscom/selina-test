import { AppService } from './app.service';
import { GetLocationsFilterDto } from './dto/get-locations-filter.dto';
import { Location } from './entities/location.entity';
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Activity } from './entities/activity.entity';
import { CreateActivityBookingDto } from './dto/create-activity-booking.dto';
import { BookingActivity } from './entities/booking-activity.entity';
import { GetActivitiesFilterDto } from './dto/get-activities-filter.dto';
import { GetAvailableTypesDto } from './dto/get-available-types.dto';
import { GetTopLocationsDto } from './dto/get-top-locations.dto';
import { CreateHotelBookingDto } from './dto/create-hotel-booking.dto';
import { GetAvailableRoomsInHotelForDatesDto } from './dto/get-available-rooms-in-hotel-for-dates.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('locations')
  findAllLocations(
    @Query() filterDTO: GetLocationsFilterDto,
  ): Promise<Location[]> {
    return this.appService.findAllLocations(filterDTO);
  }

  @Get('activities')
  findAllActivities(
    @Query() filterDTO: GetActivitiesFilterDto,
  ): Promise<Activity[]> {
    return this.appService.findAllActivities(filterDTO);
  }

  @Post('show-available-rooms')
  findAllRoomsInHotelForDates(
    @Body() filterDTO: GetAvailableRoomsInHotelForDatesDto,
  ): Promise<object> {
    return this.appService.findRoomsInHotelForDates(filterDTO);
  }

  @Post('available-types-of-room')
  findAllAvailableTypesOfRoomForLocation(
    @Body() filterDTO: GetAvailableTypesDto,
  ): Promise<object> {
    return this.appService.findAllAvailableTypesOfRoomForLocation(filterDTO);
  }

  @Get('get-top-locations')
  findTopLocations(@Query() filterDTO: GetTopLocationsDto): Promise<object> {
    return this.appService.findTopLocations(filterDTO);
  }

  @Post('book-activity')
  createActivityBooking(
    @Body() createActivityBookingDto: CreateActivityBookingDto,
  ): Promise<BookingActivity> {
    return this.appService.createActivityBooking(createActivityBookingDto);
  }

  @Post('book-hotel')
  createHotelBooking(
    @Body() createHotelBookingDto: CreateHotelBookingDto,
  ): Promise<boolean> {
    return this.appService.createHotelBooking(createHotelBookingDto);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
