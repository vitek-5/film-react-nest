import { Test } from '@nestjs/testing';
import { FilmsController } from '../../films/controllers/films.controller';
import { FilmsService } from '../../films/services/films.service';
import { fixtureFilm1 } from '../../fixtures/films.fixtures';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        findSchedule: jest.fn(),
      })
      .compile();

    controller = moduleRef.get<FilmsController>(FilmsController);
    service = moduleRef.get<FilmsService>(FilmsService);
  });

  it('.findAll() should call findAll method of the service', async () => {
    await controller.getAllFilms();

    expect(service.findAll).toHaveBeenCalled();
  });

  it('.findSchedule() should call findSchedule method of the service', async () => {
    await controller.getFilmSchedule(fixtureFilm1.id);

    expect(service.findSchedule).toHaveBeenCalledWith(fixtureFilm1.id);
  });
});
