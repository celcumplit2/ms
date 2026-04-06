import {BASE_URL} from '@/config';
import styles from '@/styles/scss/layout/breadcrumbs.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import {BreadcrumbList, WithContext} from 'schema-dts';

export interface BreadcrumbsLink {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    links: BreadcrumbsLink[];
}

function getFullBreadcrumbs({links}: { links: BreadcrumbsLink[] }): BreadcrumbsLink[] {
    return links;
}

function BreadcrumbItem({link, index, length}: { link: BreadcrumbsLink, index: number, length: number }) {
    return (
        <>
            {index === length
                ? (<strong role="listitem" aria-current="location">{link.label}</strong>)
                : (<Link href={{pathname: link.href}} role="listitem">{link.label}</Link>)
            }
            {index < length ? (
                <Image src="/images/breadcrumbs/icon-chevron-right.svg" alt="Chevron Right Icon" height="16" width="16" loading="lazy"/>
            ) : null}
        </>
    );
}

export default function Breadcrumbs({links}: BreadcrumbsProps) {
    const breadcrumbs: BreadcrumbsLink[] = getFullBreadcrumbs({links});
    const length = breadcrumbs.length - 1;

    const jsonLd: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': '#breadcrumbs',
        itemListElement: breadcrumbs.map((link, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: link.label,
            item: new URL(link.href, BASE_URL).toString(),
        })),
    };

    return links.length > 0 ? (
        <>
            <nav className={styles['breadcrumbs']} aria-label="Breadcrumb">
                <p role="list">
                    <Link href="/" role="listitem">
                        <Image src="/images/breadcrumbs/icon-home.svg" alt="Home Icon" height="20" width="20" loading="lazy"/>
                    </Link>
                    <Image src="/images/breadcrumbs/icon-chevron-right.svg" alt="Chevron Right Icon" height="16" width="16" loading="lazy"/>
                    {breadcrumbs.map((link, index) => (
                        <BreadcrumbItem key={`${link.href}-${index}`} link={link} index={index} length={length}/>
                    ))}
                </p>
            </nav>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    ) : null;
}
