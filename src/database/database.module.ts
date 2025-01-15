import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (
        databaseConfiguration: ConfigType<typeof databaseConfig>,
      ) => ({
        type: databaseConfiguration.type,
        host: databaseConfiguration.host,
        port: databaseConfiguration.port,
        database: databaseConfiguration.database,
        username: databaseConfiguration.username,
        password: databaseConfiguration.password,
        autoLoadEntities: databaseConfiguration.autoLoadEntities,
        synchronize: databaseConfiguration.synchronize,
      }),
    }),
  ],
})
export class DatabaseModule {}
