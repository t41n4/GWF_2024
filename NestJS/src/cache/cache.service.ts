import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { Redis } from 'ioredis';

@Injectable()
export class CacheService {

    constructor(@InjectRedis() private readonly redis: Redis) { }

    async set(key: string, data: any, ttl: number) {
        await this.redis.set(key, JSON.stringify(data), 'EX', ttl);
    }

    async get<T>(key: string): Promise<T> {
        const data = await this.redis.get(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    async setList(key: string, data: any[], ttl: number) {
        await this.redis.del(key);
        for (const item of data) {
            await this.redis.rpush(key, JSON.stringify(item));
        }
        await this.redis.expire(key, ttl);
    }

    async getList<T>(key: string, start: number, end: number): Promise<T[]> {
        const data = await this.redis.lrange(key, start, end);
        return data.map(item => JSON.parse(item));
    }

    async getListLength(key: string): Promise<number> {
        return await this.redis.llen(key);
    }
}
