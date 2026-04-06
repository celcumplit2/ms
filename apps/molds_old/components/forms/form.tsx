'use client';

import Alert from '@/components/forms/alert';
import styles from '@/styles/scss/forms/form.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, FormHTMLAttributes, PropsWithChildren} from 'react';

type Attributes = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export interface FormProps extends Attributes, PropsWithChildren<Attributes> {
    action: (formData: FormData) => void | Promise<void>;
    success: boolean;
    thanksId: string;
    thanksMessage: string;
    internalError: null | string;
}

export default function Form({children, action, success, thanksId, thanksMessage, internalError, className, ...restProps}: FormProps) {
    return (
        <>
            {success && (
                <Alert variant="success" id={thanksId}>{thanksMessage}</Alert>
            )}
            {!success && (
                <form
                    action={action}
                    className={clsx(styles['form'], className)}
                    {...restProps}
                >
                    {children}
                </form>
            )}
            {internalError !== null && (
                <Alert variant="failure">
                    Something goes wrong on the server side. <br/>Please try again later!
                </Alert>
            )}
        </>
    );
}
