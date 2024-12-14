import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

class Condition {
  @IsString()
  text: string;

  @IsString()
  icon: string;

  @IsNumber()
  code: number;
}

export class CurrentWeather {
  @IsNumber()
  last_updated_epoch: number;

  @IsString()
  last_updated: string;

  @IsNumber()
  temp_c: number;

  @IsNumber()
  temp_f: number;

  @IsNumber()
  is_day: number;

  @ValidateNested()
  @Type(() => Condition)
  condition: Condition;

  @IsNumber()
  wind_mph: number;

  @IsNumber()
  wind_kph: number;

  @IsNumber()
  wind_degree: number;

  @IsString()
  wind_dir: string;

  @IsNumber()
  pressure_mb: number;

  @IsNumber()
  pressure_in: number;

  @IsNumber()
  precip_mm: number;

  @IsNumber()
  precip_in: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  cloud: number;

  @IsNumber()
  feelslike_c: number;

  @IsNumber()
  feelslike_f: number;

  @IsNumber()
  windchill_c: number;

  @IsNumber()
  windchill_f: number;

  @IsNumber()
  heatindex_c: number;

  @IsNumber()
  heatindex_f: number;

  @IsNumber()
  dewpoint_c: number;

  @IsNumber()
  dewpoint_f: number;

  @IsNumber()
  vis_km: number;

  @IsNumber()
  vis_miles: number;

  @IsNumber()
  uv: number;

  @IsNumber()
  gust_mph: number;

  @IsNumber()
  gust_kph: number;
}

class Astro {
  @IsString()
  sunrise: string;

  @IsString()
  sunset: string;

  @IsString()
  moonrise: string;

  @IsString()
  moonset: string;

  @IsString()
  moon_phase: string;

  @IsNumber()
  moon_illumination: number;

  @IsNumber()
  is_moon_up: number;

  @IsNumber()
  is_sun_up: number;
}

class HourlyWeather {
  @IsNumber()
  time_epoch: number;

  @IsString()
  time: string;

  @IsNumber()
  temp_c: number;

  @IsNumber()
  temp_f: number;

  @IsNumber()
  is_day: number;

  @ValidateNested()
  @Type(() => Condition)
  condition: Condition;

  @IsNumber()
  wind_mph: number;

  @IsNumber()
  wind_kph: number;

  @IsNumber()
  wind_degree: number;

  @IsString()
  wind_dir: string;

  @IsNumber()
  pressure_mb: number;

  @IsNumber()
  pressure_in: number;

  @IsNumber()
  precip_mm: number;

  @IsNumber()
  precip_in: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  cloud: number;

  @IsNumber()
  feelslike_c: number;

  @IsNumber()
  feelslike_f: number;

  @IsNumber()
  windchill_c: number;

  @IsNumber()
  windchill_f: number;

  @IsNumber()
  heatindex_c: number;

  @IsNumber()
  heatindex_f: number;

  @IsNumber()
  dewpoint_c: number;

  @IsNumber()
  dewpoint_f: number;

  @IsNumber()
  vis_km: number;

  @IsNumber()
  vis_miles: number;

  @IsNumber()
  gust_mph: number;

  @IsNumber()
  gust_kph: number;

  @IsNumber()
  uv: number;
}


class DailyWeatherDay {
  @IsNumber()
  maxtemp_c: number;

  @IsNumber()
  maxtemp_f: number;

  @IsNumber()
  mintemp_c: number;

  @IsNumber()
  mintemp_f: number;

  @IsNumber()
  avgtemp_c: number;

  @IsNumber()
  avgtemp_f: number;

  @IsNumber()
  maxwind_mph: number;

  @IsNumber()
  maxwind_kph: number;

  @IsNumber()
  totalprecip_mm: number;

  @IsNumber()
  totalprecip_in: number;

  @IsNumber()
  totalsnow_cm: number;

  @IsNumber()
  avgvis_km: number;

  @IsNumber()
  avgvis_miles: number;

  @IsNumber()
  avghumidity: number;

  @IsNumber()
  daily_will_it_rain: number;

  @IsNumber()
  daily_chance_of_rain: number;

  @IsNumber()
  daily_will_it_snow: number;

  @IsNumber()
  daily_chance_of_snow: number;

  @ValidateNested()
  @Type(() => Condition)
  condition: Condition;

  @IsNumber()
  uv: number;
}

class DailyWeather {
  @IsString()
  date: string;

  @IsNumber()
  date_epoch: number;

  @IsObject()
  @ValidateNested()
  @Type(() => DailyWeatherDay)
  day: DailyWeatherDay;

  @IsObject()
  @ValidateNested()
  @Type(() => Astro)
  astro: Astro;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HourlyWeather)
  hour: HourlyWeather[];
}

export class Forecast {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailyWeather)
  forecastday: DailyWeather[];
}

export class Location {
  @IsString()
  name: string;

  @IsString()
  region: string;

  @IsString()
  country: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsString()
  tz_id: string;

  @IsNumber()
  localtime_epoch: number;

  @IsString()
  localtime: string;
}

export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ValidateNested()
  @Type(() => CurrentWeather)
  current: CurrentWeather;

  @ValidateNested()
  @Type(() => Forecast)
  forecast: Forecast;
}
