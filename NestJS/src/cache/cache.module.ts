import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';


@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            url: 'redis://localhost:6379',
            options: {
                password: process.env.REDIS_PASSWORD,
            }
        }),
    ],
})
export class CacheModule { }