import { IsNumber, IsISO8601 } from 'class-validator';
export class GetAvailableTypesDto {
  @IsNumber()
  locationId: number;

  @IsISO8601()
  date: string;
}
