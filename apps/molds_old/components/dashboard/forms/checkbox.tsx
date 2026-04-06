'use client';

import InputFeedback from '@/components/dashboard/forms/input-feedback';
import Label from '@/components/dashboard/forms/label';
import {clsx} from 'clsx';
import {DetailedHTMLProps, InputHTMLAttributes, ReactNode, useMemo} from 'react';

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: ReactNode;
    error?: string;
}

export default function Checkbox({label, error, id, ...rest}: CheckboxProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <div className="flex flex-col flex-1 justify-center">
            <Label
                className="flex gap-1 items-center"
                hasError={hasError}
                htmlFor={id}
            >
                <input
                    {...rest}
                    className={clsx(
                        'h-5 w-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500',
                        {
                            'border-2 border-red-700': !hasError,
                        },
                    )}
                    id={id}
                    type="checkbox"
                />
                {label}
            </Label>
            <InputFeedback>{error}</InputFeedback>
        </div>
    );
}
