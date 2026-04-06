'use client';

import Input, {InputProps} from '@/components/forms/input';
import InputFeedback from '@/components/forms/input-feedback';
import Label from '@/components/forms/label';
import styles from '@/styles/scss/forms/form-file-input.module.scss';
import {clsx} from 'clsx';
import {ReactNode, useMemo} from 'react';

interface FormFileInputProps extends Omit<InputProps, 'type'> {
    icon: ReactNode;
    acceptedMimeType: string;
    maxSize: string;
    label?: string;
}

export default function FormFileInput({label, icon, acceptedMimeType, maxSize, id, error, required, ...rest}: FormFileInputProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <>
            <Label htmlFor={id} required={required} error={error}>{label}</Label>
            <Label
                className={clsx(styles['file-label'], {[styles['file-label--error']]: hasError})}
                htmlFor={id}
            >
                {icon}
                <Input id={id} error={error} required={required} {...rest} type="file"/>
                <InputFeedback>{error}</InputFeedback>
                <span>Click to upload<br/>{acceptedMimeType} (max. {maxSize})</span>
            </Label>
        </>
    );
}
