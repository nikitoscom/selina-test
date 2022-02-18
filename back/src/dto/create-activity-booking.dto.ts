import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsOptional,
  MinLength,
  MaxLength,
  IsNumber,
  IsISO8601,
} from 'class-validator';
export class CreateActivityBookingDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  activityId: number;

  @IsISO8601()
  date: string;
}
