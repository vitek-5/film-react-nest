import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { AppConfigModule } from './app-config.module';
import { DatabaseModule } from './database/database.module';
import { FilmsController } from './films/controllers/films.controller';
import { OrderController } from './order/controllers/order.controller';
import { FilmsService } from './films/services/films.service';
import { OrderService } from './order/services/order.service';
import { FilmsRepository } from './repository/films.repository.interface';
import { FilmsPostgresRepository } from './repository/films.postgres.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AppConfigModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    FilmsService,
    OrderService,
    {
      provide: FilmsRepository,
      useClass: FilmsPostgresRepository,
    },
  ],
})
export class AppModule {}
