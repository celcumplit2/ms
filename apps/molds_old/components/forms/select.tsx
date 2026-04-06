'use client';

import styles from '@/styles/scss/forms/select.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, SelectHTMLAttributes, useMemo} from 'react';

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    options: Record<string, string>;
    error?: string;
    placeholder?: string;
}

export default function Select({error, className, options, placeholder, ...rest}: SelectProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <select
            className={clsx(className, styles['select'], {[styles['error']]: hasError})}
            {...rest}
        >
            {placeholder !== undefined && (<option value="">{placeholder}</option>)}
            {Object.keys(options).map((key) => (
                <option value={key} key={key}>{options[key]}</option>
            ))}
        </select>
    );
}
