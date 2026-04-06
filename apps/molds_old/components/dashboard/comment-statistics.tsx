import {countComments, countPublishedComments, countUnpublishedComments} from '@/modules/comment/comment.service';

export default async function CommentStatistics() {
    const total = await countComments();
    const published = await countPublishedComments();
    const unpublished = await countUnpublishedComments();

    return (
        <div className="rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Comments</div>
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
