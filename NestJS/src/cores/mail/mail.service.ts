import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { SentMessageInfo } from 'nodemailer';
import { EnvironmentVariables, MailEnv } from 'src/common/types/environment.type';
import { MailDTO } from './mail.dto';
import { MailEntityRepository } from './mail.repository';
import { TasksService } from '../task/tasks.service';
import { WeatherDTO } from '../weather/weather.dto';
import { CronExpression } from '@nestjs/schedule';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class MailService {

  private readonly logger = new Logger(MailService.name);
  private readonly mailConfig: MailEnv;

  constructor(
    private readonly mailRepository: MailEntityRepository,
    private readonly mailService: MailerService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly tasksService: TasksService,
    private readonly weatherService: WeatherService,
  ) {
    this.mailConfig = this.configService.get('mail');
  }

  async subscribeDailyMail(mail: MailDTO) {
    try {
      const token = randomBytes(15).toString('hex');

      const confirmation_url = `${this.mailConfig.host}/mail/confirm?token=${token}`;

      const mailRecord = this.mailRepository.create({
        email: mail.to,
        emailToken: token,
        isConfirmed: false,
        location: mail.location,
      });

      await this.mailRepository.save(mailRecord);

      const sentMessageInfo: SentMessageInfo = await this.mailService.sendMail({
        to: mail.to,
        subject: 'Subscription Confirmation',
        template: 'mail.sub.ejs',
        context: {
          confirmation_url,
        },
        priority: 'high',
      });
      return sentMessageInfo;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send email');
    }
  }

  async confirmSubscription(token: string) {
    try {
      const mailRecord = await this.mailRepository.findOne({
        where: {
          emailToken: token,
        }
      });
      if (!mailRecord) {
        throw new Error('Invalid token');
      } else if (mailRecord.isConfirmed) {
        throw new Error('Email already confirmed');
      } else {
        mailRecord.isConfirmed = true;
        const res = await this.mailRepository.save(mailRecord);
        const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (res) {
          this.sendDailyMailToOne(mailRecord.email, true);
          this.tasksService.addTask(CronExpression.EVERY_DAY_AT_6AM, mailRecord.email, () => {
            this.sendDailyMailToOne(mailRecord.email);
          }, currentTimezone);
          return res;
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async resendConfirmationMail(email: string) {
    try {
      const mailRecord = await this.mailRepository.findOne({
        where: {
          email,
        }
      });

      if (!mailRecord) {
        throw new Error('Email not found');
      } else if (mailRecord.isConfirmed) {
        throw new Error('Email already confirmed');
      }

      const confirmation_url = `${this.mailConfig.host}/mail/confirm?token=${mailRecord.emailToken}`;

      const sentMessageInfo: SentMessageInfo = await this.mailService.sendMail({
        to: mailRecord.email,
        subject: 'Subscription Confirmation',
        template: 'mail.sub.ejs',
        context: {
          confirmation_url,
        },
        priority: 'high',
      });
      return sentMessageInfo;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send email');
    }
  }

  async unsubscribe(email: string) {
    try {

      const res = await this.mailRepository.remove(
        await this.mailRepository.findOne({
          where: {
            email,
          }
        })
      );
      // remove cron job
      this.tasksService.removeTask(email);

      return res;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to unsubscribe');
    }
  }

  private async sendDailyMailToOne(to: string, first?: boolean) {
    try {
      const mailRecord = await this.mailRepository.findOne({
        where: {
          email: to,
          isConfirmed: true,
        }
      });

      if (!mailRecord) {
        throw new Error('Email not found');
      } else if (!mailRecord.isConfirmed) {
        throw new Error('Email not confirmed');
      }

      const weather = await this.weatherService.getWeatherByLocation(mailRecord.location, 1, 1);

      this.logger.debug(JSON.stringify(weather));

      await this.mailService.sendMail({
        to: mailRecord.email,
        subject: 'Daily Weather Report',
        template: first ? 'mail.daily.first.ejs' : 'mail.daily.ejs',
        context: {
          weather,
        }
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send email');
    }
  }
}
