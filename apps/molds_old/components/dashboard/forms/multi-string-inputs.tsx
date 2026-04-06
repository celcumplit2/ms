'use client';

import Button from '@/components/dashboard/common/button';
import Input from '@/components/dashboard/forms/input';
import Label from '@/components/dashboard/forms/label';
import {IconTrash} from '@tabler/icons-react';
import {ChangeEvent, MouseEvent, useState} from 'react';

interface MultiStringInputsProps {
    initValues: string[];
    errors: Record<string, string>;
    name: string;
    label?: string;
    addBtnLabel?: string;
}

export default function MultiStringInputs(
    {
        initValues,
        errors,
        name,
        label,
        addBtnLabel,
    }: MultiStringInputsProps,
) {
    const [values, setValues] = useState<Record<number, string>>(() => initValues.reduce((previousValue, currentValue) => ({
        ...previousValue,
        [Date.now()]: currentValue,
    }), {}));

    const handleOnChange = (key: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const newValues = {...values};

        newValues[key] = event.target.value;

        setValues(newValues);
    };

    function addValue(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        setValues({...values, [Date.now()]: ''});
    }

    function deleteValue(time: number) {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[time]: _, ...rest} = values;

            setValues(rest);
        };
    }

    return (
        <div className="flex flex-col gap-2">
            {label !== undefined && <Label hasError={false}>{label}</Label>}
            {Object.keys(values).map((key, index) => (
                <div
                    key={`${name}-${key}`}
                    className="flex gap-2"
                >
                    <Input
                        name={`${name}[${index}]`}
                        value={values[Number(key)]}
                        error={errors[`${name}[${index}]`]}
                        onChange={handleOnChange(Number(key))}
                    />
                    <Button
                        color="danger"
                        size="sm"
                        onClick={deleteValue(Number(key))}
                    >
                        <IconTrash/>
                    </Button>
                </div>
            ))}
            <Button
                color="success"
                size="sm"
                onClick={addValue}
            >
                {addBtnLabel ?? 'Add'}
            </Button>
        </div>
    );
}
