import { ScheduleDTO } from '../films/dto/films.dto';

export const fixtureSchedule1: ScheduleDTO = {
  id: 'd3f54ca3-8e19-4b63-afd4-6a8d03933339',
  daytime: '2024-06-28T10:00:53+03:00',
  hall: 0,
  rows: 5,
  seats: 10,
  price: 350,
  taken: ['3:7', '3:8'],
};

export const fixtureSchedule2: ScheduleDTO = {
  id: '2d794723-eadc-43ea-b82b-268f0178fb43',
  daytime: '2024-06-28T14:00:53+03:00',
  hall: 1,
  rows: 5,
  seats: 10,
  price: 350,
  taken: ['2:5', '3:1', '3:5', '3:9'],
};

export const fixtureEmptySchedule: ScheduleDTO = {
  id: '043eb8fb-454a-40d2-9ce9-6fe80072bf8b',
  daytime: '2024-06-28T16:00:53+03:00',
  hall: 2,
  rows: 5,
  seats: 10,
  price: 350,
  taken: [],
};
export const fixtureBookedSchedule: ScheduleDTO = {
  ...fixtureEmptySchedule,
  taken: ['1,1', '1:2'],
};
