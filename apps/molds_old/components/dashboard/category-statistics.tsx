import {countCategories, countRootCategories, countSubCategories} from '@/modules/category/category.service';

export default async function CategoryStatistics() {
    const total = await countCategories();
    const totalRoots = await countRootCategories();
    const totalSubcategories = await countSubCategories();

    return (
        <div className="rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Categories</div>
                <p className="text-gray-700 text-base mb-2">
                    Total: {total}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    Root categories: {totalRoots}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    Sub-categories: {totalSubcategories}
                </p>
            </div>
        </div>
    );
}
