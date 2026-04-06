import React, {PropsWithChildren} from 'react';

export default function DataTableActions({children}: PropsWithChildren) {
    return (
        <p className="relative flex justify-end items-center gap-2">
            {children}
        </p>
    );
}
