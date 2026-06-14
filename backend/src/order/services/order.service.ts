import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from '../../repository/films.repository.interface';
import { OrderConfirmationDto, OrderDto } from '../dto/order.dto';
import * as crypto from 'crypto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsRepository) {}

  async create(
    order: OrderDto,
  ): Promise<{ total: number; items: OrderConfirmationDto[] }> {
    const { tickets } = order;
    if (!tickets?.length) {
      throw new BadRequestException('Список билетов пуст');
    }

    const confirmed: OrderConfirmationDto[] = [];
    const requestedSeats = new Set<string>();

    for (const item of tickets) {
      const schedule = await this.filmsRepo.findSchedule(item.film);
      if (!schedule) {
        throw new NotFoundException(`Фильм "${item.film}" не найден`);
      }

      const session = schedule.find(
        (sessionItem) => sessionItem.id === item.session,
      );
      if (!session) {
        throw new NotFoundException(
          `Сеанс "${item.session}" для фильма "${item.film}" не найден`,
        );
      }

      if (item.row > session.rows || item.seat > session.seats) {
        throw new BadRequestException(
          `Место ${item.row}:${item.seat} отсутствует в выбранном зале`,
        );
      }

      const seatKey = `${item.row}:${item.seat}`;
      const requestSeatKey = `${item.film}:${item.session}:${seatKey}`;
      if (requestedSeats.has(requestSeatKey)) {
        throw new BadRequestException(`Дублирующийся билет: ${seatKey}`);
      }
      requestedSeats.add(requestSeatKey);

      const success = await this.filmsRepo.bookSchedule(
        item.film,
        item.session,
        [seatKey],
      );

      if (!success) {
        throw new ConflictException(
          `Место ${item.row}:${item.seat} на сеансе "${item.session}" уже занято`,
        );
      }

      confirmed.push({
        ...item,
        id: crypto.randomUUID(),
      });
    }

    return {
      total: confirmed.length,
      items: confirmed,
    };
  }
}
