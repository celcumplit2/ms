import {countAuthors} from '@/modules/author/author.service';

export default async function AuthorStatistics() {
    const total = await countAuthors();

    return (
        <div className="rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Authors</div>
                <p className="text-gray-700 text-base mb-2">
                    Total: {total}
                </p>
            </div>
        </div>
    );
}
