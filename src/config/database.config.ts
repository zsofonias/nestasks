import { registerAs } from '@nestjs/config';
import { DatabaseType } from './enums/database-type.enum';
import { IDatabaseConfig } from './interfaces/database-config.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): IDatabaseConfig => ({
    type: DatabaseType.POSTGRESS,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
    autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
  }),
);
