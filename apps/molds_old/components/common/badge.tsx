import styles from '@/styles/scss/common/badge.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react';

interface BadgeProps extends PropsWithChildren, DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    type?: 'primary';
    size?: 'sm';
}

export default function Badge({type, size, className, children, ...restProps}: BadgeProps) {
    return (
        <span className={clsx(className, styles['badge'], {
            [styles['badge--small']]: size === 'sm',
            [styles['badge--primary']]: type === 'primary',
        })} {...restProps}>{children}</span>
    );
}
