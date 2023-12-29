import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ScriptsModule } from './scripts/scripts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.databaseConnections.postgres.params.host,
      port: config.databaseConnections.postgres.params.port,
      username: config.databaseConnections.postgres.username,
      password: config.databaseConnections.postgres.password,
      database: config.databaseConnections.postgres.database,
      name: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
      // ssl: true,
      extra: {
        trustServerCertificate: true,
        Encrypt: true,
        IntegratedSecurity: false,
      },
      entities: [],
    }),
    ScheduleModule.forRoot(),
    ScriptsModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
