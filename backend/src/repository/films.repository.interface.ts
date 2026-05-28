import { FilmsDTO, ScheduleDTO } from '../films/dto/films.dto';

export abstract class FilmsRepository {
  abstract findAll(): Promise<FilmsDTO[]>;
  abstract findSchedule(filmId: string): Promise<ScheduleDTO[] | null>;
  abstract bookSchedule(
    filmId: string,
    scheduleId: string,
    bookSeats: string[],
  ): Promise<boolean>;
}
