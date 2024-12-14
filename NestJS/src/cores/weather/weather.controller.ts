import { Body, Controller, Get, HttpStatus, Logger, Post, Query, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseType } from "src/common/enums/response.enum";
import { WeatherDTO } from "./weather.dto";
import { WeatherEntity } from "./entities/weather.entity";
import { WeatherService } from "./weather.service";


@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
    private logger = new Logger(WeatherController.name);
    constructor(private weatherService: WeatherService) { }

    // @Get("forecast")
    // @ApiOperation({
    //     summary: 'Get weather forecast',
    //     // description: 'Lorem ipsum ....',
    // })
    // @ApiQuery({ name: 'query', type: 'string', required: true, example: 'Jakarta', description: 'City name' })
    // @ApiQuery({ name: 'days', type: 'integer', required: true, example: 3, description: 'Number of days' })
    // async forecastWeather(
    //     @Query('query') query: string,
    //     @Query('days') days: number,
    //     @Res() response
    // ): Promise<WeatherEntity> {
    //     try {
    //         const weatherForecast = await this.weatherService.forecast(query, days);
    //         return response.status(HttpStatus.OK).json({
    //             type: ResponseType.SUCCESS,
    //             message: null,
    //             data: weatherForecast || [],
    //         });
    //     } catch (error) {
    //         return response.status(HttpStatus.BAD_REQUEST).json({
    //             type: ResponseType.ERROR,
    //             message: 'Something went wrong, Please try again later',
    //             data: null,
    //         });
    //     }
    // }

    @Get('search')
    @ApiOperation({
        summary: 'Get weather',
        // description: 'Lorem ipsum ....',
    })
    @ApiQuery({ name: 'location', type: 'string', required: true, example: 'Jakarta', description: 'City name' })
    @ApiQuery({ name: 'page', type: 'integer', required: false, example: 1, description: 'Page number' })
    @ApiQuery({ name: 'pageSize', type: 'integer', required: false, example: 4, description: 'Number of items per page' })
    async getWeather(
        @Query('location') location: string,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 4,
        @Res() response
    ): Promise<{ page: WeatherEntity, total: number }> {
        try {
            const weather = await this.weatherService.getWeatherByLocation(location, page, pageSize);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: null,
                data: weather || [],
            });
        } catch (error) {
            if (error.message === HttpStatus.NOT_FOUND.toString()) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    type: ResponseType.ERROR,
                    message: 'City not found',
                    data: null,
                });
            }
            else {
                return response.status(HttpStatus.BAD_REQUEST).json({
                    type: ResponseType.ERROR,
                    message: 'Something went wrong, Please try again later',
                    data: null,
                });
            }

        }
    }

    // @Post("save")
    // @ApiBody({ type: WeatherDTO })
    // async saveWeather(@Body() body: WeatherEntity): Promise<WeatherEntity> {
    //     return this.weatherService.saveWeather(body);
    // }

    // get by location  
    // @Get("location")
    // @ApiOperation({
    //     summary: 'Get weather by location',
    //     // description: 'Lorem ipsum ....',
    // })
    // @ApiQuery({ name: 'location', type: 'string', required: true, example: 'Jakarta', description: 'City name' })
    // async getWeatherByLocation(
    //     @Query('location') location: string,
    //     @Res() response
    // ): Promise<WeatherEntity> {
    //     try {
    //         const weather = await this.weatherService.getWeatherByLocation(location);
    //         return response.status(HttpStatus.OK).json({
    //             type: ResponseType.SUCCESS,
    //             message: null,
    //             data: weather || [],
    //         });
    //     } catch (error) {
    //         return response.status(HttpStatus.BAD_REQUEST).json({
    //             type: ResponseType.ERROR,
    //             message: 'Something went wrong, Please try again later',
    //             data: null,
    //         });
    //     }
    // }

}