import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { FilmsDTO, ScheduleDTO } from '../dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAllFilms(): Promise<{ total: number; items: FilmsDTO[] }> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  getFilmSchedule(
    @Param('id') id: string,
  ): Promise<{ total: number; items: ScheduleDTO[] }> {
    return this.filmsService.findSchedule(id);
  }
}
