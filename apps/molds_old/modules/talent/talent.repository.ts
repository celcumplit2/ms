import {CustomRepository} from '@/core/repositories/custom-repository';

export interface Talent {
  id: number;
  alias: string;
  name: string;
  surname: string;
  dob: Date,
  title: string;
  languages: Array<{ language: string; level: string; }>;
  monthlyRate: { amount: number; currency: string };
  contacts: Array<Record<string, string>>;
  experienceSince: Date;
  availableSince: Date;
  employmentType: string[];
  location: string;
  utcOffset: string;
  intro: string;
}

export class TalentRepository extends CustomRepository {
  talents: Talent[] = [
    {
      id: 1,
      alias: 'amelia-l-84dc47',
      name: 'Amelia',
      surname: 'Laurent',
      dob: new Date('1990-05-01'),
      title: 'Senior - Software Developer',
      languages: [
        {language: 'en', level: 'CEFR Level B2'},
        {language: 'ro', level: 'CEFR Level C2'},
      ],
      monthlyRate: {
        amount: 5000,
        currency: 'USD',
      },
      contacts: [
        {phone: '+37368112233'},
        {email: 'amelia@moldstud.com'},
        {linkedin: 'https://www.linkedin.com/in/amelia'},
      ],
      experienceSince: new Date('2015-07-01'),
      availableSince: new Date('2025-02-01'),
      employmentType: ['Full-Time', 'Part-Time'],
      location: 'MD',
      utcOffset: '+02:00',
      intro: 'Passionate JavaScript developer with expertise in building web applications. I focus on creating eﬃcient, scalable, and user-friendly solutions. I enjoy collaborating with teams, optimizing performance, and sharing knowledge to drive innovation in web development. Always eager to learn new technologies and tackle challenging projects.',
    },
    {
      id: 2,
      alias: 'amelia-l-84dc41',
      name: 'Amelia',
      surname: 'Laurent',
      dob: new Date('1990-05-01'),
      title: 'Senior - Software Developer',
      languages: [
        {language: 'en', level: 'CEFR Level B2'},
        {language: 'ro', level: 'CEFR Level C2'},
      ],
      monthlyRate: {
        amount: 5000,
        currency: 'USD',
      },
      contacts: [
        {phone: '+37368112233'},
        {email: 'amelia@moldstud.com'},
        {linkedin: 'https://www.linkedin.com/in/amelia'},
      ],
      experienceSince: new Date('2015-07-01'),
      availableSince: new Date('2025-02-01'),
      employmentType: ['Full-Time', 'Part-Time'],
      location: 'MD',
      utcOffset: '+02:00',
      intro: 'Intro',
    },
    {
      id: 3,
      alias: 'amelia-l-84dc42',
      name: 'Amelia',
      surname: 'Laurent',
      dob: new Date('1990-05-01'),
      title: 'Senior - Software Developer',
      languages: [
        {language: 'en', level: 'CEFR Level B2'},
        {language: 'ro', level: 'CEFR Level C2'},
      ],
      monthlyRate: {
        amount: 5000,
        currency: 'USD',
      },
      contacts: [
        {phone: '+37368112233'},
        {email: 'amelia@moldstud.com'},
        {linkedin: 'https://www.linkedin.com/in/amelia'},
      ],
      experienceSince: new Date('2015-07-01'),
      availableSince: new Date('2025-02-01'),
      employmentType: ['Full-Time', 'Part-Time'],
      location: 'MD',
      utcOffset: '+02:00',
      intro: 'Intro',
    },
    {
      id: 4,
      alias: 'amelia-l-84dc43',
      name: 'Amelia',
      surname: 'Laurent',
      dob: new Date('1990-05-01'),
      title: 'Senior - Software Developer',
      languages: [
        {language: 'en', level: 'CEFR Level B2'},
        {language: 'ro', level: 'CEFR Level C2'},
      ],
      monthlyRate: {
        amount: 5000,
        currency: 'USD',
      },
      contacts: [
        {phone: '+37368112233'},
        {email: 'amelia@moldstud.com'},
        {linkedin: 'https://www.linkedin.com/in/amelia'},
      ],
      experienceSince: new Date('2015-07-01'),
      availableSince: new Date('2025-02-01'),
      employmentType: ['Full-Time', 'Part-Time'],
      location: 'MD',
      utcOffset: '+02:00',
      intro: 'Intro',
    },
    {
      id: 5,
      alias: 'amelia-l-84dc44',
      name: 'Amelia',
      surname: 'Laurent',
      dob: new Date('1990-05-01'),
      title: 'Senior - Software Developer',
      languages: [
        {language: 'en', level: 'CEFR Level B2'},
        {language: 'ro', level: 'CEFR Level C2'},
      ],
      monthlyRate: {
        amount: 5000,
        currency: 'USD',
      },
      contacts: [
        {phone: '+37368112233'},
        {email: 'amelia@moldstud.com'},
        {linkedin: 'https://www.linkedin.com/in/amelia'},
      ],
      experienceSince: new Date('2015-07-01'),
      availableSince: new Date('2025-02-01'),
      employmentType: ['Full-Time', 'Part-Time'],
      location: 'MD',
      utcOffset: '+02:00',
      intro: 'Intro',
    },
  ];

  async search({offset = 0, limit = 12}: {
    offset?: number,
    limit?: number,
    relations: string[],
    search?: string
  }): Promise<Talent[]> {
    return this.talents.slice(offset, limit);
  }

  async count(): Promise<number> {
    return this.talents.length;
  }

  async oneByAlias({alias}: { alias: string }): Promise<Talent | undefined> {
    return this.talents.find((talent) => talent.alias === alias);
  }
}
