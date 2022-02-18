import { IsNumber, IsISO8601 } from 'class-validator';
export class GetTopLocationsDto {
  @IsISO8601()
  date: string;
}
