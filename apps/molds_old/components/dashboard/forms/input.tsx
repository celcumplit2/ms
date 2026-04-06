'use client';

import InputFeedback from '@/components/dashboard/forms/input-feedback';
import Label from '@/components/dashboard/forms/label';
import NativeInput, {NativeInputProps} from '@/components/dashboard/forms/native-input';
import {ReactNode, useMemo} from 'react';

interface InputProps extends NativeInputProps {
    label?: ReactNode;
    error?: string;
}

export default function Input({label, error, id, ...rest}: InputProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <div className="flex flex-col flex-1">
            <Label hasError={hasError} htmlFor={id}>{label}</Label>
            <NativeInput
                id={id}
                hasError={hasError}
                {...rest}
            />
            <InputFeedback>{error}</InputFeedback>
        </div>
    );
}
