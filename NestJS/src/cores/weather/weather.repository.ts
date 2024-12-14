import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepostitory } from "src/common/base.repository";
import { Repository } from "typeorm";
import { WeatherEntity } from "./entities/weather.entity";
import { WeatherRepositoryInterface } from "./weather.interface";

export class WeatherEntityRepository
    extends BaseAbstractRepostitory<WeatherEntity>
    implements WeatherRepositoryInterface {
    constructor(@InjectRepository(WeatherEntity)
    private readonly WeatherEntityRepository: Repository<WeatherEntity>) {
        super(WeatherEntityRepository)
    }
}