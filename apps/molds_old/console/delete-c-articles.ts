import {database} from '@/database';
import {article} from '@/modules/article/article.model';
import {inArray} from 'drizzle-orm';

const C_ALIASES = [
    'app-designer-for-intuitive-user-interfaces',
    'apple-developer-for-ios-applications',
    'enterprise-iot-solutions-for-connected-businesses',
    'indian-app-developers-providing-expertise-in-app-development',
    'mobile-app-design-services-for-intuitive-interfaces',
    'outsourcing-software-development-company-for-cost-effective-solutions',
    'software-design-services-for-user-centric-designs',
    'software-development-services-company-providing-solutions',
    'staff-augmentation-vs-managed-services-for-project-needs',
];

async function handle() {
    const rows = await database
        .select({id: article.id, alias: article.alias})
        .from(article)
        .where(inArray(article.alias, C_ALIASES));

    process.stdout.write(`Found ${rows.length} c- articles in DB:\n`);
    for (const r of rows) {
        process.stdout.write(`  [${r.id}] ${r.alias}\n`);
    }

    if (rows.length === 0) {
        process.stdout.write('Nothing to delete.\n');
        return;
    }

    await database.delete(article).where(inArray(article.alias, C_ALIASES));
    process.stdout.write(`Deleted ${rows.length} articles.\n`);
}

handle()
    .then(() => process.exit(0))
    .catch((err) => { console.error(err); process.exit(1); });
