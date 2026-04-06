import {database} from '@/database';
import {ArticleRepository} from '@/modules/article/article.repository';
import {browseArticles} from '@/modules/article/article.service';
import {existsSync} from 'node:fs';
import {opendir} from 'node:fs/promises';
import {resolve} from 'node:path';

let articleRepository: ArticleRepository | undefined;

function getArticleRepository(): ArticleRepository {
  if (!articleRepository) {
    articleRepository = new ArticleRepository(database);
  }

  return articleRepository;
}

async function getRandomImage(dirPath: string): Promise<string> {
  const dir = await opendir(dirPath);

  let count = 0;
  let selected: string | null = null;

  for await (const entry of dir) {
    if (entry.isFile()) {
      count++;

      if (Math.random() < 1 / count) {
        selected = entry.name;
      }
    }
  }

  return selected!;
}

async function handle() {
  let articlesMissingImage = 0;
  let brokenArticlesFixed = 0;
  let offset = 0;
  const limit = 50;
  let collection;
  const repository = getArticleRepository();

  do {
    collection = await browseArticles({
      offset,
      limit,
    });

    for (const article of collection.items) {
      if (!article.image) {
        console.log('Article missing image: ', article.id);
        articlesMissingImage++;

        continue;
      }

      const imagesRoot = resolve(process.cwd(), 'uploads', 'images');

      if (existsSync(resolve(imagesRoot, article.image))) {
        continue;
      }

      article.image = await getRandomImage(imagesRoot);

      console.log('Assigned new image for: ', article.id, article.image);

      await repository.save({
        id: article.id,
        entity: article,
      });

      brokenArticlesFixed++;
    }

    offset += limit;
  } while (collection.items.length > 0);

  console.log(`Articles missing image: ${articlesMissingImage}`);
  console.log(`Broken articles fixed: ${brokenArticlesFixed}`);

  process.exit(0);
}

handle();
