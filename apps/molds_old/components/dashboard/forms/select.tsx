'use client';

import InputFeedback from '@/components/dashboard/forms/input-feedback';
import Label from '@/components/dashboard/forms/label';
import NativeSelect, {NativeInputProps} from '@/components/dashboard/forms/native-select';
import {ReactNode, useMemo} from 'react';

interface SelectProps extends Omit<NativeInputProps, 'hasError'> {
    label?: ReactNode;
    error?: string;
}

export default function Select({options = [], label, error, id, children, ...rest}: SelectProps) {
    const hasError = useMemo(() => error !== undefined, [error]);

    return (
        <div className="flex flex-col flex-1">
            <Label hasError={hasError} htmlFor={id}>{label}</Label>
            <NativeSelect
                hasError={hasError}
                id={id}
                {...rest}
            >
                {children ?? options.map((option) => (
                    <option key={`select-option-${id ?? label}-${option.value}`} value={option.value}>{option.label}</option>
                ))}
            </NativeSelect>
            <InputFeedback>{error}</InputFeedback>
        </div>
    );
}
