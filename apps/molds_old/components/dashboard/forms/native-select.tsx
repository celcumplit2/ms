import {clsx} from 'clsx';
import {DetailedHTMLProps, PropsWithChildren, SelectHTMLAttributes} from 'react';

export interface SelectOption {
    label: string;
    value: string;
}

export interface NativeInputProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, PropsWithChildren {
    options?: SelectOption[];
    hasError?: boolean;
}

export default function NativeSelect({hasError = false, className, options = [], children, ...rest}: NativeInputProps) {
    return (
        <select
            className={clsx(
                className,
                // 'border py-1 px-2 text-grey-800',
                'px-2 py-2 text-base border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
                {
                    'border-red-700': hasError,
                    'border-gray-300': !hasError,
                },
            )}
            {...rest}
        >
            {children ?? options.map((option) => (
                <option key={`select-option-${option.value}`} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}
