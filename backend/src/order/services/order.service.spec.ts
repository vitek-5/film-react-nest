import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { fixtureFilm1 } from '../../fixtures/films.fixtures';
import {
  fixtureOrder1,
  fixtureOrder2,
  fixtureOrderDuplicateTicket,
  fixtureOrderEmptyTickets,
  fixtureOrderInvalidRow,
  fixtureOrderInvalidSeat,
  fixtureOrderUnknownFilm,
  fixtureOrderUnknownSession,
} from '../../fixtures/order.fixtures';
import { fixtureSchedule1 } from '../../fixtures/schedule.fixtures';
import { FilmsMockRepository } from '../../repository/films.mock.repository.ts';
import { FilmsRepository } from '../../repository/films.repository.interface';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let repository: FilmsMockRepository;

  beforeEach(async () => {
    repository = new FilmsMockRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: FilmsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  describe('create', () => {
    it('should create order with single ticket', async () => {
      const result = await service.create(fixtureOrder1);

      expect(result.total).toBe(1);
      expect(result.items[0]).toMatchObject({
        film: fixtureFilm1.id,
        session: fixtureSchedule1.id,
        row: 1,
        seat: 1,
        price: 350,
      });
      expect(result.items[0].id).toBeDefined();
      expect(repository.bookSchedule).toHaveBeenCalledWith(
        fixtureFilm1.id,
        fixtureSchedule1.id,
        ['1:1'],
      );
    });

    it('should create order with multiple tickets', async () => {
      const result = await service.create(fixtureOrder2);

      expect(result.total).toBe(2);
      expect(repository.bookSchedule).toHaveBeenCalledTimes(2);
      expect(result.items[0].id).not.toBe(result.items[1].id);
    });

    it('should throw BadRequestException for empty tickets', async () => {
      await expect(service.create(fixtureOrderEmptyTickets)).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.bookSchedule).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException for unknown film', async () => {
      repository.findSchedule.mockResolvedValueOnce(null);

      await expect(service.create(fixtureOrderUnknownFilm)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.bookSchedule).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException for unknown session', async () => {
      await expect(service.create(fixtureOrderUnknownSession)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.bookSchedule).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid row', async () => {
      await expect(service.create(fixtureOrderInvalidRow)).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.bookSchedule).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid seat', async () => {
      await expect(service.create(fixtureOrderInvalidSeat)).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.bookSchedule).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for duplicate ticket', async () => {
      await expect(service.create(fixtureOrderDuplicateTicket)).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.bookSchedule).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException when seat already taken', async () => {
      repository.bookSchedule.mockResolvedValueOnce(false);

      await expect(service.create(fixtureOrder1)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
