'use client';

import InputGroup from '@/components/forms/input-group';
import styles from '@/styles/scss/common/tag-cloud.module.scss';
import Image from 'next/image';
import {ChangeEventHandler, FormEventHandler, useMemo, useState} from 'react';

export interface Tag {
    name: string;
    url: string;
}

interface TagCloudProps {
    tags: Tag[];
}

export default function TagCloud({tags}: TagCloudProps) {
    const [search, setSearch] = useState('');

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearch(event.target.value);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    };

    const filteredTags = useMemo(() => {
        if (search.length === 0) {
            return tags;
        }

        return tags.filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()));
    }, [search, tags]);

    return (
        <>
            <form className={styles['form']} onSubmit={onSubmit}>
                <InputGroup
                    name="search"
                    value={search}
                    onChange={onSearchChange}
                    autoComplete="off"
                    addon={<Image src="/images/services/icon-search.svg" alt="Search Icon" width="24" height="24" loading="lazy"/>}
                />
            </form>
            <ul className={styles['list']}>
                {filteredTags.map((tag) => (
                    <li key={tag.name}>{tag.name}</li>
                ))}
            </ul>
        </>
    );
}
