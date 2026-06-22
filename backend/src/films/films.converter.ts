import { FilmsDTO, ScheduleDTO } from './dto/films.dto';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

export class FilmsConverter {
  static toDto(doc: Film): FilmsDTO {
    return {
      id: doc.id,
      rating: doc.rating,
      director: doc.director,
      tags: doc.tags,
      image: doc.image,
      cover: doc.cover,
      title: doc.title,
      about: doc.about,
      description: doc.description,
      schedule: doc.schedule?.map(FilmsConverter.toScheduleDto) || [],
    };
  }

  static toScheduleDto(s: Schedule): ScheduleDTO {
    return {
      id: s.id,
      daytime: s.daytime
        ? new Date(s.daytime).toISOString()
        : new Date().toISOString(),
      hall: Number(s.hall),
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: (s.taken || []).filter((seat) => seat.length > 0),
    };
  }
}
