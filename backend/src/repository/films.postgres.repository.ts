import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsConverter } from '../films/films.converter';
import { FilmsDTO, ScheduleDTO } from '../films/dto/films.dto';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { FilmsRepository } from './films.repository.interface';

@Injectable()
export class FilmsPostgresRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<FilmsDTO[]> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
    return films.map(FilmsConverter.toDto);
  }

  async findSchedule(filmId: string): Promise<ScheduleDTO[] | null> {
    const schedules = await this.scheduleRepository.find({
      where: { filmId },
    });

    if (!schedules.length) {
      return null;
    }

    return schedules.map(FilmsConverter.toScheduleDto);
  }

  async bookSchedule(
    filmId: string,
    scheduleId: string,
    bookSeats: string[],
  ): Promise<boolean> {
    const seatsStr = bookSeats.join(',');

    const result = await this.scheduleRepository
      .createQueryBuilder()
      .update(Schedule)
      .set({
        taken: () =>
          `CASE WHEN taken = '' THEN :newSeats ELSE taken || ',' || :newSeats END`,
      })
      .where('id = :scheduleId', { scheduleId })
      .andWhere('"filmId" = :filmId', { filmId })
      .andWhere(
        `(taken = '' OR NOT (string_to_array(taken, ',') && :checkSeats::text[]))`,
      )
      .setParameter('newSeats', seatsStr)
      .setParameter('checkSeats', `{${seatsStr}}`)
      .execute();

    return result.affected === 1;
  }
}
