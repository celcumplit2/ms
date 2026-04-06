import Input, {InputProps} from '@/components/forms/input';
import {clsx} from 'clsx';
import {ReactNode, useMemo} from 'react';
import styles from '@/styles/scss/forms/input-group.module.scss';

export interface InputGroupProps extends InputProps {
    addon: ReactNode;
    groupClassName?: string;
}

export default function InputGroup({addon, groupClassName, error, ...rest}: InputGroupProps) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);

    return (
        <div className={clsx(styles['input-group'], groupClassName, {[styles['input-group--error']]: hasError})}>
            <Input error={error} {...rest}/>
            <span>{addon}</span>
        </div>
    );
}
