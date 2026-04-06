import styles from '@/styles/scss/common/heading.module.scss';
import {PropsWithChildren} from 'react';

export default function Heading({children}: PropsWithChildren) {
    return (
        <hgroup className={styles['heading']}>
            {children}
        </hgroup>
    );
}
