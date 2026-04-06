import styles from '@/styles/scss/forms/alert.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react';

type Attributes = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface AlertProps extends Attributes, PropsWithChildren<Attributes> {
    variant: 'success' | 'failure';
}

export default function Alert({variant, children, className, ...restProps}: AlertProps) {
    return (
        <div
            className={clsx(
                styles['alert'],
                {
                    [styles['success']]: variant === 'success',
                    [styles['failure']]: variant === 'failure',
                },
                className,
            )}
            {...restProps}
        >
            {children}
        </div>
    );
}
