'use client';

import styles from '@/styles/scss/forms/input.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, InputHTMLAttributes, useMemo} from 'react';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: string;
}

export default function Input({error, className, ...rest}: InputProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <input
            className={clsx(className, styles['input'], {[styles['error']]: hasError})}
            {...rest}
        />
    );
}
