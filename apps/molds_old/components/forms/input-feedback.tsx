import styles from '@/styles/scss/forms/input-feedback.module.scss';
import {PropsWithChildren} from 'react';

export default function InputFeedback({children}: PropsWithChildren) {
    return !children
        ? null
        : (
            <p className={styles['feedback']}>{children}</p>
        );
}
