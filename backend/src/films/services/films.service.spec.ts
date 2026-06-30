// src/films/services/films.service.spec.ts
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { fixtureFilm1, fixtureFilmsArray } from '../../fixtures/films.fixtures';
import { fixtureSchedule1 } from '../../fixtures/schedule.fixtures';
import { FilmsRepository } from '../../repository/films.repository.interface';
import { FilmsService } from './films.service';
import { FilmsMockRepository } from '../../repository/films.mock.repository.ts';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: FilmsMockRepository;

  beforeEach(async () => {
    repository = new FilmsMockRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return films with total count', async () => {
      const result = await service.findAll();

      expect(result.total).toBe(2);
      expect(result.items).toHaveLength(2);
      expect(result.items[0].id).toBe(fixtureFilmsArray()[0].id);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when films list is empty', async () => {
      repository.findAll.mockResolvedValue([]); // ← без Once

      const promise = service.findAll();

      await expect(promise).rejects.toThrow(NotFoundException);
      await expect(promise).rejects.toThrow('Список фильмов пуст');
    });
  });

  describe('findSchedule', () => {
    it('should return schedule with total count', async () => {
      const result = await service.findSchedule(fixtureFilm1.id);

      expect(result.total).toBe(3);
      expect(result.items).toHaveLength(3);
      expect(result.items[0].id).toBe(fixtureSchedule1.id);
      expect(repository.findSchedule).toHaveBeenCalledWith(fixtureFilm1.id);
    });

    it('should throw NotFoundException when schedule not found', async () => {
      const nonExistentFilmId = 'non-existent-id';

      const promise = service.findSchedule(nonExistentFilmId);

      await expect(promise).rejects.toThrow(NotFoundException);
      await expect(promise).rejects.toThrow(
        `Расписание для фильма "${nonExistentFilmId}" не найдено`,
      );
    });
  });
});
