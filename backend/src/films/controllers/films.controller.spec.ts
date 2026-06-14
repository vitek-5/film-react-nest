import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../controllers/films.controller';
import { FilmsService } from '../services/films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn(),
            findSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
