import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CacheService } from 'src/cache/cache.service';
import { IsEmailConfirmedConstraint, IsEmailExistConstraint } from 'src/common/decorator/email/email.validate.decorator';
import { TasksService } from '../task/tasks.service';
import { WeatherEntity } from '../weather/entities/weather.entity';
import { WeatherEntityRepository } from '../weather/weather.repository';
import { WeatherService } from '../weather/weather.service';
import { MailController } from './mail.controller';
import { MailEntity } from './mail.entity';
import { MailEntityRepository } from './mail.repository';
import { MailService } from './mail.service';
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get('MAIL_HOST'),
                    secure: true,
                    port: 465,
                    auth: {
                        user: configService.get('MAIL_USER'),
                        pass: configService.get('MAIL_PASS')
                    },
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new EjsAdapter(),
                    options: {
                        strict: false,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([MailEntity]),
        TypeOrmModule.forFeature([WeatherEntity]),
        HttpModule
    ],
    providers: [
        MailService,
        MailEntityRepository,
        WeatherEntityRepository,
        IsEmailConfirmedConstraint,
        IsEmailExistConstraint,
        WeatherService,
        TasksService,
        CacheService
    ],
    controllers: [
        MailController
    ],
    exports: [MailService, TypeOrmModule]
})
export class MailModule { }
