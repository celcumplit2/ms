import {clsx} from 'clsx';
import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

export interface NativeInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    hasError?: boolean;
}

export default function NativeInput({hasError = false, className, ...rest}: NativeInputProps) {
    return (
        <input
            className={clsx(
                className,
                // 'border py-1 px-2 text-grey-800',
                'px-2 py-1.5 text-base border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
                {
                    'border-red-700': hasError,
                    'border-gray-300': !hasError,
                },
            )}
            {...rest}
        />
    );
}
