import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class WeatherDTO {
    @ApiProperty({ example: 'Ho Chi Minh City' })
    @IsNotEmpty()
    location: string;

    @ApiProperty({ example: 30 })
    @IsNotEmpty()
    temperature: number;

    @ApiProperty({ example: 10 })
    @IsNotEmpty()
    windSpeed: number;

    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    humidity: number;

    @ApiProperty({ example: new Date() })
    @IsNotEmpty()
    timestamp: Date;
}