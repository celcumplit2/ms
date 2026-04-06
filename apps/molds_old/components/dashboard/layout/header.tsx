import {UserButton} from '@stackframe/stack';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="h-16 flex flex-row justify-between items-center bg-gray-800 px-4">
            <Link href="/dashboard" className="flex gap-2 items-center text-white font-bold">
                <Image src="/images/logo.svg" alt="MoldStud Logo" width="32" height="32" />
                MoldStud Dashboard
            </Link>
            <UserButton/>
        </header>
    );
}
