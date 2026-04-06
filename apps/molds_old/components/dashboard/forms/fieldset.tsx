import {clsx} from 'clsx';
import {DetailedHTMLProps, FieldsetHTMLAttributes, PropsWithChildren} from 'react';

type Attributes = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;

interface FieldsetProps extends Attributes, PropsWithChildren<Attributes> {
    legend?: string;
}

export default function Fieldset({className, legend, children}: FieldsetProps) {
    return (
        <fieldset className={clsx(className, 'grid gap-4 grid-cols-1 px-2 pb-2 border border-gray-100')}>
            {legend !== undefined && (
                <legend className="font-bold text-lg mb-1 py-1 px-2 bg-gray-100">{legend}</legend>
            )}
            {children}
        </fieldset>
    );
}
