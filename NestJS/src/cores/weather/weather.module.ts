import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherEntityRepository } from './weather.repository';
import { TasksService } from '../task/tasks.service';
import { CacheService } from 'src/cache/cache.service';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([WeatherEntity])],
    controllers: [WeatherController],
    providers: [WeatherService, WeatherEntityRepository, TasksService, CacheService],
    exports: [WeatherService, TypeOrmModule],
})
export class WeatherModule { }