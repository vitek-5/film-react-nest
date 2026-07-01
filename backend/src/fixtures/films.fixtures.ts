// test/fixtures/film.fixture.ts
import { FilmsDTO } from '../films/dto/films.dto';
import {
  fixtureEmptySchedule,
  fixtureSchedule1,
  fixtureSchedule2,
} from './schedule.fixtures';

export const fixtureFilm1: FilmsDTO = {
  id: '0354a762-8928-427f-81d7-1656f717f39c',
  rating: 9.5,
  director: 'Оливер Беннет',
  tags: ['Рекомендуемые'],
  image: '/bg4s.jpg',
  cover: '/bg4c.jpg',
  title: 'Парадокс Нексуса',
  about: 'Фильм об эксперименте по соединению человеческих умов...',
  description: 'В фильме исследуются последствия новаторского эксперимента...',
  schedule: [fixtureSchedule1, fixtureSchedule2, fixtureEmptySchedule],
};

const fixtureFilm2: FilmsDTO = {
  id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  rating: 2.9,
  director: 'Итан Райт',
  tags: ['Документальный'],
  image: '/bg1s.jpg',
  cover: '/bg1c.jpg',
  title: 'Архитекторы общества',
  about:
    'Документальный фильм, исследующий влияние искусственного интеллекта...',
  description:
    'Документальный фильм Итана Райта исследует влияние технологий...',
  schedule: [fixtureSchedule1, fixtureEmptySchedule],
};

export const fixtureFilmsArray = (): FilmsDTO[] => [fixtureFilm1, fixtureFilm2];
