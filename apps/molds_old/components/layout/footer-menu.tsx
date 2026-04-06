import Link from 'next/link';

export type Menu = Array<{
    label: string;
    href: string;
    asNativeLink?: boolean;
}>;

export interface FooterMenuProps {
    title?: string; // TODO: Make it required. Temporary until we'll not have ready the entire footer menu.
    menu: Menu;
}

export function FooterMenu({title, menu}: FooterMenuProps) {
    return menu.length > 0 ? (
        <ul>
            {title ? (<li><h4>${title}</h4></li>) : ''}
            {menu.map((item) => (
                <li key={item.label}>
                    {item.asNativeLink ? (
                        <a href={item.href} title={item.label}>
                            {item.label}
                        </a>
                    ) : (
                        <Link href={{pathname: item.href}} title={item.label}>
                            {item.label}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    ) : null;
}
