import {clsx} from 'clsx';
import {DetailedHTMLProps, TextareaHTMLAttributes} from 'react';

export interface NativeTextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    hasError?: boolean;
}

export default function NativeTextarea({hasError = false, className, ...rest}: NativeTextareaProps) {
    return (
        <textarea
            className={clsx(
                className,
                // 'border py-1 px-2 text-grey-800',
                'px-2 py-2 text-base border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none',
                {
                    'border-red-700': hasError,
                    'border-gray-300': !hasError,
                },
            )}
            {...rest}
        />
    );
}
