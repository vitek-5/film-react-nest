import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsDTO, ScheduleDTO } from '../dto/films.dto';
import { FilmsRepository } from '../../repository/films.repository.interface';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepo: FilmsRepository) {}

  async findAll(): Promise<{ total: number; items: FilmsDTO[] }> {
    const items = await this.filmsRepo.findAll();

    if (items.length === 0) {
      throw new NotFoundException('Список фильмов пуст');
    }

    return {
      total: items.length,
      items,
    };
  }

  async findSchedule(
    filmId: string,
  ): Promise<{ total: number; items: ScheduleDTO[] }> {
    const schedule = await this.filmsRepo.findSchedule(filmId);

    if (!schedule) {
      throw new NotFoundException(
        `Расписание для фильма "${filmId}" не найдено`,
      );
    }

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
