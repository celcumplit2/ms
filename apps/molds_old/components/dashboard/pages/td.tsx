import {clsx} from 'clsx';
import {PropsWithChildren} from 'react';

interface TdProps extends PropsWithChildren {
    className?: string;
}

export default function Td({className, children}: TdProps) {
    return (
        <td className={clsx('px-2 py-3', className)}>
            {children}
        </td>
    );
}
