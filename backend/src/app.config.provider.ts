import { ConfigModule } from '@nestjs/config';

const env = process.env;

function parseDatabaseConfig(): AppConfigDatabase {
  return {
    driver: env.DATABASE_DRIVER,
    host: env.DATABASE_URL,
    port: Number(env.DATABASE_PORT),
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  };
}

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: parseDatabaseConfig(),
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
