import { FilmsDTO, ScheduleDTO } from '../films/dto/films.dto';
import { fixtureFilm1, fixtureFilmsArray } from '../fixtures/films.fixtures';
import {
  fixtureEmptySchedule,
  fixtureSchedule1,
  fixtureSchedule2,
} from '../fixtures/schedule.fixtures';
import { FilmsRepository } from './films.repository.interface';

export class FilmsMockRepository implements FilmsRepository {
  findAll: jest.Mock<Promise<FilmsDTO[]>> = jest
    .fn()
    .mockResolvedValue(fixtureFilmsArray());

  findSchedule: jest.Mock<Promise<ScheduleDTO[] | null>, [string]> = jest
    .fn()
    .mockImplementation((filmId: string) => {
      if (filmId === fixtureFilm1.id) {
        return Promise.resolve([
          fixtureSchedule1,
          fixtureSchedule2,
          fixtureEmptySchedule,
        ]);
      }
      return Promise.resolve(null);
    });

  bookSchedule: jest.Mock<Promise<boolean>, [string, string, string[]]> = jest
    .fn()
    .mockResolvedValue(true);
}
