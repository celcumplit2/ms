import 'dotenv/config';
import {CronJob} from 'cron';

new CronJob(
  '*/30 * * * *',
  async () => {
    await fetch(`${process.env.HOST}/dashboard/api/cron/latest-articles`, {
      method: 'POST',
    });
  },
  null,
  true,
  'Europe/Chisinau',
);
