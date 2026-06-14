import { FilmsDTO, ScheduleDTO } from './dto/films.dto';

export class FilmsConverter {
  static toDto(doc: any): FilmsDTO {
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

  static toScheduleDto(s: any): ScheduleDTO {
    return {
      id: s.id,
      daytime: s.daytime
        ? new Date(s.daytime).toISOString()
        : new Date().toISOString(),
      hall: Number(s.hall),
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken || [],
    };
  }
}
