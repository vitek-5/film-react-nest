import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsUrl,
  IsArray,
} from 'class-validator';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'double precision' })
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  director: string;

  @Column('simple-array')
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  cover: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  about: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  description: string;

  // Связь с расписанием (один фильм -> много сеансов)
  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
