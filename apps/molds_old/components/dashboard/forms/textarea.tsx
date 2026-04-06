'use client';

import InputFeedback from '@/components/dashboard/forms/input-feedback';
import Label from '@/components/dashboard/forms/label';
import NativeTextarea, {NativeTextareaProps} from '@/components/dashboard/forms/native-textarea';
import {ReactNode, useMemo} from 'react';

interface TextareaProps extends Omit<NativeTextareaProps, 'hasError'> {
    label?: ReactNode;
    error?: string;
}

export default function Textarea({label, error, id, ...rest}: TextareaProps) {
    const hasError = useMemo(() => error !== undefined, [error]);

    return (
        <div className="flex flex-col flex-1">
            <Label hasError={hasError} htmlFor={id}>{label}</Label>
            <NativeTextarea
                id={id}
                hasError={hasError}
                {...rest}
            />
            <InputFeedback>{error}</InputFeedback>
        </div>
    );
}
