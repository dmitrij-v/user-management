import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';
import { OrganizationEntity } from './organizations/organization.entity';

import {
  dbHost,
  dbDialect,
  dbUserName,
  dbPassword,
  dbName,
} from './config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: dbDialect,
      host: dbHost,
      port: 5432,
      username: dbUserName,
      password: dbPassword,
      database: dbName,
      entities: [ UserEntity, OrganizationEntity ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
