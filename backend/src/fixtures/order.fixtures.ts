import { OrderDto, OrderItemDto } from '../order/dto/order.dto';
import { fixtureFilm1 } from './films.fixtures';
import { fixtureEmptySchedule, fixtureSchedule1 } from './schedule.fixtures';

export const fixtureOrderItem1: OrderItemDto = {
  film: fixtureFilm1.id,
  session: fixtureSchedule1.id,
  daytime: '2024-06-28T10:00:53+03:00',
  row: 1,
  seat: 1,
  price: 350,
};

export const fixtureOrderItem2: OrderItemDto = {
  film: fixtureFilm1.id,
  session: fixtureEmptySchedule.id,
  daytime: '2024-06-28T16:00:53+03:00',
  row: 2,
  seat: 2,
  price: 350,
};

export const fixtureOrder1: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [fixtureOrderItem1],
};

export const fixtureOrder2: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [fixtureOrderItem1, fixtureOrderItem2],
};

export const fixtureOrderEmptyTickets: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [],
};

export const fixtureOrderUnknownFilm: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [
    {
      ...fixtureOrderItem1,
      film: 'unknown-film-id',
    },
  ],
};

export const fixtureOrderUnknownSession: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [
    {
      ...fixtureOrderItem1,
      session: 'unknown-session-id',
    },
  ],
};

export const fixtureOrderInvalidRow: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [
    {
      ...fixtureOrderItem1,
      row: 100,
    },
  ],
};

export const fixtureOrderInvalidSeat: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [
    {
      ...fixtureOrderItem1,
      seat: 100,
    },
  ],
};

export const fixtureOrderDuplicateTicket: OrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [fixtureOrderItem1, fixtureOrderItem1],
};
