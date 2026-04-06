import styles from '@/styles/scss/forms/legend.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react';

type Attributes = DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;

interface LegendProps extends Attributes, PropsWithChildren<Attributes> {
}

export default function Legend({children, className, ...restProps}: LegendProps) {
    return (
        <legend className={clsx(styles['legend'], className)} {...restProps}>{children}</legend>
    );
}
