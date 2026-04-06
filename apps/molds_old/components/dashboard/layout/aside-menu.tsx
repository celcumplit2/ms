'use client';

import {IconBook, IconBriefcase2, IconDatabaseImport, IconMessages, IconSchool, IconTags} from '@tabler/icons-react';
import {clsx} from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ReactNode} from 'react';

interface MenuItem {
    label: string;
    href: string;
    icon: ReactNode;
}

interface ParentMenuItem {
    label: string;
    icon: ReactNode;
    menu: Menu;
}

type Menu = Array<MenuItem | ParentMenuItem>;


function AsideMenuItem({item, pathname}: { item: MenuItem, pathname: string }) {
    return (
        <Link
            key={item.label}
            className={clsx('flex gap-2 items-center p-2 box-border text-white hover:bg-gray-700 group', {
                'bg-gray-600': pathname === item.href,
            })}
            href={{pathname: item.href}}
        >
            {item.icon}
            <span className="ms-3">{item.label}</span>
        </Link>
    );
}

function AsideSubMenu({item, pathname}: { item: ParentMenuItem, pathname: string }) {
    return (
        <div
            className="flex flex-col gap-2"
        >
            <div className="flex fgap-2 items-center p-2 box-border text-white bg-gray-800 group border-b-2 border-gray-600">
                {item.icon}
                <span className="ms-3">{item.label}</span>
            </div>

            <div className="pl-6">
                {item.menu!.map((item, index) => 'href' in item && item.href
                    ? <AsideMenuItem
                        key={`menu-item-${index}-${item.label}`}
                        item={item}
                        pathname={pathname}
                    />
                    : <AsideSubMenu
                        key={`menu-parent-item-${index}-${item.label}`}
                        item={item as ParentMenuItem}
                        pathname={pathname}
                    />,
                )}
            </div>
        </div>
    );
}

export default function AsideMenu() {
    const menu = [
        {label: 'Authors', href: '/dashboard/authors', icon: <IconSchool/>},
        {label: 'Articles', href: '/dashboard/articles', icon: <IconBook/>},
        {label: 'Categories', href: '/dashboard/categories', icon: <IconTags/>},
        {label: 'Comments', href: '/dashboard/comments', icon: <IconMessages/>},
        {label: 'Jobs', href: '/dashboard/jobs', icon: <IconBriefcase2/>},
        {
            label: 'Imports',
            icon: <IconDatabaseImport/>,
            menu: [
                {label: 'Articles', href: '/dashboard/imports/articles', icon: <IconBook/>},
                {label: 'Update Articles', href: '/dashboard/imports/articles/update', icon: <IconBook/>},
                {label: 'Categories', href: '/dashboard/imports/categories', icon: <IconTags/>},
                {label: 'Comments', href: '/dashboard/imports/comments', icon: <IconMessages/>},
                {label: 'Jobs', href: '/dashboard/imports/jobs', icon: <IconBriefcase2/>},
            ],
        },
    ];
    const pathname = usePathname();

    return (
        <nav className="w-full box-border p-4 font-medium flex flex-col gap-2">
            {menu.map((item, index) => 'href' in item && item.href
                ? <AsideMenuItem
                    key={`menu-item-${index}-${item.label}`}
                    item={item as MenuItem}
                    pathname={pathname}
                />
                : <AsideSubMenu
                    key={`menu-parent-item-${index}-${item.label}`}
                    item={item as ParentMenuItem}
                    pathname={pathname}
                />,
            )}
        </nav>
    );
}
