'use client';

import Checkbox, {CheckboxProps} from '@/components/forms/checkbox';
import Label from '@/components/forms/label';
import styles from '@/styles/scss/forms/checkbox-label.module.scss';
import {clsx} from 'clsx';
import {PropsWithChildren, useMemo} from 'react';

export interface CheckboxLabelProps extends CheckboxProps, PropsWithChildren {
}

export default function CheckboxLabel({id, required, error, children, ...rest}: CheckboxLabelProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <Label
            className={clsx(styles['checkbox-label'], {[styles['checkbox-label--error']]: hasError})}
            htmlFor={id}
            required={required}
        >
            <Checkbox className={styles['input']} id={id} required={required} {...rest} />
            <span>{children}</span>
        </Label>
    );
}
