import {IconArrowBackUp} from '@tabler/icons-react';
import Link from 'next/link';

interface BackButtonProps {
    href: string;
}

export default function BackButton({href}: BackButtonProps) {
    return (
        <>
            <Link href={{pathname: href}} className="inline-block bg-gray-300 p-1.5">
                <IconArrowBackUp size="20"/>
            </Link>
        </>
    );
}
