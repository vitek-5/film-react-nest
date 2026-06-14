import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from '../services/films.service';
import { FilmsRepository } from '../../repository/films.repository.interface';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: {
            findAll: jest.fn(),
            findSchedule: jest.fn(),
            bookSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
