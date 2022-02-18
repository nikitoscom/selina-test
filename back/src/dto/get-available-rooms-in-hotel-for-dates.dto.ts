import { IsNumber, IsISO8601 } from 'class-validator';
export class GetAvailableRoomsInHotelForDatesDto {
  @IsNumber()
  hotelId: number;

  @IsISO8601()
  start: string;

  @IsISO8601()
  end: string;
}
