import CheckboxLabel, {CheckboxLabelProps} from '@/components/forms/checkbox-label';
import InputFeedback from '@/components/forms/input-feedback';
import {ReactNode} from 'react';

interface FormCheckboxLabelProps extends CheckboxLabelProps {
    label: ReactNode;
}

export default function FormCheckboxLabel({error, label, ...rest}: FormCheckboxLabelProps) {
    return (
        <>
            <CheckboxLabel error={error} {...rest}>{label}</CheckboxLabel>
            <InputFeedback>{error}</InputFeedback>
        </>
    );
}
