import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsNumber,
  Min,
  IsOptional,
  IsUUID,
  IsArray,
  IsDateString,
} from 'class-validator';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  daytime: string;

  @Column({ type: 'int' })
  @IsInt()
  @Min(1)
  hall: number;

  @Column({ type: 'int', name: 'rows' })
  @IsInt()
  @Min(1)
  rows: number;

  @Column({ type: 'int' })
  @IsInt()
  @Min(1)
  seats: number;

  @Column({ type: 'double precision' })
  @IsNumber()
  @Min(0)
  price: number;

  @Column('simple-array')
  @IsArray()
  @IsString({ each: true })
  taken: string[];

  @Column({ name: 'filmId', type: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  filmId: string | null;

  @ManyToOne(() => Film, (film) => film.schedule, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'filmId' })
  film: Film | null;
}
