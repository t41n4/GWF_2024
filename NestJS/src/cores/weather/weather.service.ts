import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { CacheService } from 'src/cache/cache.service';
import { EnvironmentVariables, WeatherAPIEnv } from 'src/common/types/environment.type';
import { httpGetConfig } from 'src/config/axios.config';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherEntityRepository } from './weather.repository';


export interface Search {
    id: number
    name: string
    region: string
    country: string
    lat: number
    lon: number
    url: string
}

@Injectable()
export class WeatherService {
    private weatherConfig: WeatherAPIEnv;
    private logger = new Logger(WeatherService.name);
    constructor(
        @InjectRepository(WeatherEntity)
        private readonly weatherRepository: WeatherEntityRepository,
        private readonly configService: ConfigService<EnvironmentVariables>,
        private readonly httpService: HttpService,
        private readonly cacheService: CacheService

    ) {
        this.weatherConfig = this.configService.get('weather');
    }

    async forecast(query: string, days: number): Promise<WeatherEntity> {
        try {
            const apiKey = this.weatherConfig.apiKey;
            const url = `${this.weatherConfig.baseUrl}/forecast.json?q=${query}&days=${days}&key=${apiKey}&alerts=no&aqi=no`;
            const response = await firstValueFrom(this.httpService.get<WeatherEntity>(url, httpGetConfig));
            const data = response.data;
            return data;
        } catch (error) {
            this.logger.error('forecast', error);
            throw new error;
        }
    }

    async search(query: string): Promise<Search[]> {
        try {
            const apiKey = this.weatherConfig.apiKey;
            const url = `${this.weatherConfig.baseUrl}/search.json?q=${query}&key=${apiKey}`;
            const response = await firstValueFrom(this.httpService.get<Search[]>(url, httpGetConfig));
            const data = response.data;
            return data;
        } catch (error) {
            this.logger.error(error);
            throw new error;
        }
    }

    private paginateWeather(data: WeatherEntity, page: number, pageSize: number) {
        data.forecast.forecastday = data.forecast.forecastday.slice((page - 1) * pageSize, page * pageSize);
        return data;
    }

    async getWeatherByLocation(location: string, page: number, pageSize: number): Promise<{ page: WeatherEntity, total: number }> {
        try {
            const search = await this.search(location);
            this.logger.log(`getWeatherByLocation: ${JSON.stringify(search)}`);

            if (search.length === 0) {
                throw new Error(HttpStatus.NOT_FOUND.toString());
            } else {
                const cacheKey = `weather:${search[0].id}`;
                this.logger.log(`getWeatherByLocation: ${cacheKey}`);
                const cacheData = await this.cacheService.get(cacheKey);

                if (cacheData) {
                    this.logger.debug(`data cached: ${page} ${pageSize}`);
                    const data = await this.cacheService.get<WeatherEntity>(cacheKey);
                    const paginatedData = this.paginateWeather(data, page, pageSize);
                    return { page: paginatedData, total: data.forecast.forecastday.length };
                } else {
                    const data = await this.forecast(location, 14);
                    await this.cacheService.set(cacheKey, data, 3600);
                    const paginatedData = this.paginateWeather(data, page, pageSize);
                    return { page: paginatedData, total: data.forecast.forecastday.length };
                }
            }


        } catch (error) {
            this.logger.error('getWeatherByLocation', error);
            throw new Error(error.message);
        }
    }

}