interface DataTableHeadProps {
    columns: string[];
}

export default function DataTableHead({columns}: DataTableHeadProps) {
    return (
        <tr>
            {columns.map((column) => (
                <th key={`table-th-${column}`} scope="col" className="p-1">{column}</th>
            ))}
        </tr>
    );
}
