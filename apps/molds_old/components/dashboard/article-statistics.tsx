import {countArticles, countPublishedArticles, countUnpublishedArticles} from '@/modules/article/article.service';

export default async function ArticleStatistics() {
    const total = await countArticles();
    const published = await countPublishedArticles();
    const unpublished = await countUnpublishedArticles();

    return (
        <div className="rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Articles</div>
                <p className="text-gray-700 text-base mb-2">
                    Total: {total}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    Published: {published}
                </p>
                <p className="text-gray-700 text-base">
                    Unpublished: {unpublished}
                </p>
            </div>
        </div>
    );
}
