import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository.interface';
import { FilmsDTO, ScheduleDTO } from '../films/dto/films.dto';
import { FilmsConverter } from '../films/films.converter';
import { Film } from '../films/schemas/films.schema';

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  constructor() {}

  async findAll(): Promise<FilmsDTO[]> {
    const items = await Film.find({});
    return items.map(FilmsConverter.toDto);
  }

  async findSchedule(filmId: string): Promise<ScheduleDTO[] | null> {
    const doc = await Film.findOne({ id: filmId }).select('schedule');
    if (!doc?.schedule?.length) return null;
    return doc.schedule.map(FilmsConverter.toScheduleDto);
  }

  async bookSchedule(
    filmId: string,
    scheduleId: string,
    seats: string[],
  ): Promise<boolean> {
    const result = await Film.updateOne(
      {
        id: filmId,
        'schedule.id': scheduleId,
        'schedule.taken': { $nin: seats },
      },
      { $addToSet: { 'schedule.$.taken': { $each: seats } } },
    );
    return result.modifiedCount > 0;
  }
}
