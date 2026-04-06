import {BASE_URL} from '@/config';
import {database} from '@/database';
import {Url} from '@/helpers/sitemap/sitemap';
import {JobRepository} from '@/modules/job/job.repository';

export default async function sitemap() {
  const urls: Url[] = [{
    url: new URL('/careers', BASE_URL).toString(),
    changeFrequency: 'daily',
    lastModified: new Date(),
  }, {
    url: new URL('/careers/apply-for-job', BASE_URL).toString(),
    changeFrequency: 'monthly',
    lastModified: new Date('2025-01-26'),
  },
    // {
    //   url: 'https://moldstud.com/careers/middle-php-developer-jo-php-00002',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-php-developer-jo-php-00001',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-vuejs-developer-jo-js-00001',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/middle-js-developer-jo-js-00002',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-reactjs-developer-jo-js-00003',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/middle-senior-reactjs-developer-jo-js-00004',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-nodejs-developer-jo-js-00005',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-android-developer-jo-android-00006',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-ios-developer-jo-ios-00007',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-android-developer-jo-android-00008',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/ui-ux-designer-jo-ui-ux-00009',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/project-manager-jo-pm-00010',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-nodejs-reactjs-developer',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/middle-reactjs-developer',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-reactjs-developer',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/middle-java-developer',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
    // {
    //   url: 'https://moldstud.com/careers/senior-java-developer',
    //   lastModified: new Date(2024, 6, 26, 8),
    // },
  ];
  const repository = new JobRepository(database);
  const jobs = await repository.search({offset: 0, limit: 25_000, relations: []});

  jobs.forEach((job) => {
    urls.push({
      url: new URL(`/careers/${job.alias}`, BASE_URL).toString(),
      changeFrequency: 'weekly',
      lastModified: job.updatedAt,
    });
  });

  return urls;
}
