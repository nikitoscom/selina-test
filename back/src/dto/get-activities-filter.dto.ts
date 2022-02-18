import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  Max,
  IsBoolean,
  IsString,
} from 'class-validator';
import { Country } from '../entities/country.enum';
import { Type } from 'class-transformer';

export class GetActivitiesFilterDto {
  @IsOptional()
  @IsIn(Object.values(Country))
  country: Country;

  @IsOptional()
  @IsIn(['DESC', 'ASC'])
  order: string;

  // @IsOptional()
  // @IsInt()
  // @Type(() => Number)
  // @Min(0)
  // @Max(25000)
  // take: number;

  // @IsOptional()
  // @IsInt()
  // @Type(() => Number)
  // isVerified: number;

  // @IsOptional()
  // @IsInt()
  // @Type(() => Number)
  // @Min(0)
  // @Max(1000000)
  // skip: number;
}
