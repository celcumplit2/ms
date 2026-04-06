import styles from '@/styles/scss/forms/fieldset.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react';

type Attributes = DetailedHTMLProps<HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;

interface FieldsetProps extends Attributes, PropsWithChildren<Attributes> {
}

export default function Fieldset({children, className, ...restProps}: FieldsetProps) {
    return (
        <fieldset className={clsx(styles['fieldset'], className)} {...restProps}>{children}</fieldset>
    );
}
