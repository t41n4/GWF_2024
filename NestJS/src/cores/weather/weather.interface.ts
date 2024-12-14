import { BaseInterfaceRepository } from "src/common/base.interface";
import { WeatherEntity } from "./entities/weather.entity";

export interface WeatherRepositoryInterface extends BaseInterfaceRepository<WeatherEntity> { }