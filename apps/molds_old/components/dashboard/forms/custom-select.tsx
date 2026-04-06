import InputFeedback from '@/components/dashboard/forms/input-feedback';
import Label from '@/components/dashboard/forms/label';
import dynamic from 'next/dynamic';
import {ReactNode, useMemo} from 'react';
import {GroupBase, Props, StylesConfig} from 'react-select';

const Select = dynamic(() => import('react-select'), {ssr: false});

export interface SelectOption {
    value: string;
    label: string;
}

export interface CustomSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends Props<Option, IsMulti, Group> {
    instanceId: string | number;
    label?: ReactNode;
    error?: string;
}

export default function CustomSelect<
    Option = SelectOption,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>({id, error, label, ...restProps}: CustomSelectProps<Option, IsMulti, Group>) {
    const hasError = useMemo(() => error !== undefined, [error]);

    const styles: StylesConfig<Option, IsMulti, Group> = {
        control: (styles) => ({
            ...styles,
            border: '1px solid var(--color-gray-300)',
            borderRadius: 0,
        }),
    };

    return (
        <div className="flex flex-col flex-1">
            <Label hasError={hasError} htmlFor={id}>{label}</Label>
            <Select
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                styles={styles}
                {...restProps}
                id={id}
            />
            <InputFeedback>{error}</InputFeedback>
        </div>
    );
}
