import {PropsWithChildren, ReactNode} from 'react';

interface DataTableProps extends PropsWithChildren {
    thead?: ReactNode;
}

export default function DataTable({thead, children}: DataTableProps) {
    return (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                {thead !== undefined && (
                    <thead className="bg-gray-50">{thead}</thead>
                )}
                <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
            </table>
        </div>
    );
}
