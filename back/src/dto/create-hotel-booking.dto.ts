import { IsNumber, IsISO8601 } from 'class-validator';
export class CreateHotelBookingDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  roomId: number;

  @IsISO8601()
  start: string;

  @IsISO8601()
  end: string;
}
