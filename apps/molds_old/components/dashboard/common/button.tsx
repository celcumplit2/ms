import {clsx} from 'clsx';
import {ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren} from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, PropsWithChildren {
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({color = 'primary', size = 'md', className, children, ...restProps}: ButtonProps) {
    return (
        <button className={clsx(
            className,
            'inline-block font-semibold text-sm hover:cursor-pointer',
            {
                'bg-blue-700 text-white': color === 'primary',
                'bg-indigo-700 text-white': color === 'secondary',
                'bg-green-700 text-white': color === 'success',
                'bg-yellow-700 text-white': color === 'warning',
                'bg-red-700 text-white': color === 'danger',
                'p-1': size === 'sm',
                'p-1.5': size === 'md',
                'p-2': size === 'lg',
            }
        )} {...restProps}>
            {children}
        </button>
    );
}
