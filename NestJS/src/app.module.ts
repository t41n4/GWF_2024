import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/env.config';
import { MailModule } from './cores/mail/mail.module';
import { WeatherModule } from './cores/weather/weather.module';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './cores/task/tasks.module';
import { CacheModule } from './cache/cache.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    DatabaseModule,
    MailModule,
    WeatherModule,
    CacheModule,
  ],
})
export class AppModule { }
