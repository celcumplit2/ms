import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
    src: string;
}

export function Logo({src}: LogoProps) {
    return (
        <Link className="logo" href="/">
            <Image src={src} width="32" height="32" alt="Logo" />
            MoldStud
        </Link>
    );
}
