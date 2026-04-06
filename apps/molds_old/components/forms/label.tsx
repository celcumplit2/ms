'use client';

import styles from '@/styles/scss/forms/label.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, LabelHTMLAttributes, PropsWithChildren, useMemo} from 'react';

interface LabelProps extends PropsWithChildren, DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    error?: string;
    required?: boolean;
}

export default function Label({error, className, required, children, ...rest}: LabelProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return !children
        ? null
        : (
            <label
                className={clsx(className, styles['label'], {[styles['error']]: hasError})}
                {...rest}
            >
                {children}{required && ' *'}
            </label>
        );
}
