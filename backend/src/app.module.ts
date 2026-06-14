import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/controllers/films.controller';
import { OrderController } from './order/controllers/order.controller';
import { FilmsService } from './films/services/films.service';
import { OrderService } from './order/services/order.service';
import { databaseProvider } from './database/database.provider';
import { FilmsMongoDbRepository } from './repository/films.mongodb.repository';
import { FilmsRepository } from './repository/films.repository.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        index: false, // отключаем авто-редирект на index.html
      },
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    databaseProvider,
    FilmsService,
    OrderService,
    {
      provide: FilmsRepository,
      useClass: FilmsMongoDbRepository,
    },
  ],
})
export class AppModule {}
