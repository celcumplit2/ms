import {IconPencil} from '@tabler/icons-react';
import Link from 'next/link';
import {PropsWithChildren} from 'react';

interface EditButtonProps extends PropsWithChildren {
    href: string;
}

export default function EditButton({href, children}: EditButtonProps) {
    return (
        <Link
            className="text-blue-600 hover:text-blue-900"
            href={{pathname: href}}
        >
            {children ?? (<IconPencil size="20"/>)}
        </Link>
    );
}
