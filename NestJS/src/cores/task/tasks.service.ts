import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) { }

  async addTask(cron: string, cron_id: string, task: () => void, timezone?: string) {
    const job = new CronJob(cron, task, null, true, timezone);
    this.schedulerRegistry.addCronJob('task', job);
    job.start();
    this.logger.log(`Task added with cron: ${cron}`);
  }

  async removeTask(cron_id: string) {
    try {
      const job = this.schedulerRegistry.getCronJob(cron_id);
      if (job) {
        job.stop();
        this.schedulerRegistry.deleteCronJob('task');
        this.logger.log('Task removed');
      } else {
        this.logger.log('No task to remove');
      }
    } catch (error) {
      return error.message;
    }

  }
}
