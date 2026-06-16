import {
  IsString,
  IsInt,
  Min,
  IsDateString,
  IsArray,
  ValidateNested,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
export class OrderItemDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDateString()
  daytime: string;

  @IsInt()
  @Min(1)
  row: number;

  @IsInt()
  @Min(1)
  seat: number;

  @IsInt()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsString()
  time?: string;
}

// 👇 Ответ: подтверждение с добавленным id
export class OrderConfirmationDto extends OrderItemDto {
  id: string;
}

export class OrderDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  tickets: OrderItemDto[];
}
