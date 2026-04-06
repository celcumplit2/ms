import {clsx} from 'clsx';
import {DetailedHTMLProps, LabelHTMLAttributes, PropsWithChildren} from 'react';

interface LabelProps extends PropsWithChildren, DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    hasError?: boolean;
}

export default function Label({hasError = false, className, children, ...rest}: LabelProps) {
    return !children
        ? null
        : (
            <label
                className={clsx(className, 'font-semibold mb-1 text-sm', {
                    'text-gray-700': !hasError,
                    'text-red-700': hasError,
                })}
                {...rest}
            >
                {children}
            </label>
        );
}
