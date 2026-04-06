import {IconPlus} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

interface AddButtonProps {
    href: string;
}

export default function AddButton({href}: AddButtonProps) {
    return (
        <Link
            href={{pathname: href}}
            className="flex gap-1 items-center bg-gray-600 text-white p-1.5 text-sm"
        >
            Add New <IconPlus size={16}/>
        </Link>
    );
}
