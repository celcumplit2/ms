import {Logo} from '@/components/layout/logo';
import Link from 'next/link';

export type Menu = Array<{
    label: string;
    href: string;
}>;

interface Props {
    logoSrc: string;
    menu: Menu;
}

export function Header({menu, logoSrc}: Props) {
    return (
        <header id="header">
            <Logo src={logoSrc} />

            <input type="checkbox" id="main-menu-toggler" />
            <label htmlFor="main-menu-toggler">
                <span></span>
                <span></span>
                <span></span>
            </label>

            <nav>
                {menu.map((item) => (
                    <Link key={item.label} href={{pathname: item.href}} title={item.label}>{item.label}</Link>
                ))}
            </nav>
        </header>
    );
}
