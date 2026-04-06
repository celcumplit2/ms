import styles from '@/styles/scss/forms/button.module.scss';
import {clsx} from 'clsx';
import {ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren} from 'react';

type Attributes = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface ButtonProps extends Attributes, PropsWithChildren<Attributes> {
    variant?: 'primary' | 'secondary';
    full?: boolean;
}

export default function Button({children, className, variant = 'primary', full = true, ...restProps}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles['button'],
                className,
                {
                    [styles['full']]: full,
                    [styles['button--secondary']]: variant === 'secondary',
                },
            )}
            {...restProps}
        >
            {children}
        </button>
    );
}
