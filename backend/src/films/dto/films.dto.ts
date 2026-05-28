import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ScheduleDTO {
  @IsString()
  id: string;
  @IsDateString()
  daytime: string;
  @IsString()
  hall: string;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  @IsString({ each: true })
  taken: string[];
}
export class FilmsDTO {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  @IsString({ each: true })
  tags: string[];
  @IsString()
  image: string;
  @IsString()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDTO)
  schedule: ScheduleDTO[];
}
