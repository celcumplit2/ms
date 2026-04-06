'use client';

import styles from '@/styles/scss/forms/textarea.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, TextareaHTMLAttributes, useMemo} from 'react';

export interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    error?: string;
}

export default function Textarea({error, className, ...rest}: TextareaProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <textarea
            className={clsx(className, styles['textarea'], {[styles['error']]: hasError})}
            {...rest}
        />
    );
}
