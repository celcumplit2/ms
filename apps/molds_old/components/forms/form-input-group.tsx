import InputFeedback from '@/components/forms/input-feedback';
import InputGroup, {InputGroupProps} from '@/components/forms/input-group';
import Label from '@/components/forms/label';

interface FormInputGroupProps extends InputGroupProps {
    label?: string;
}

export default function FormInputGroup({label, id, error, required, ...rest}: FormInputGroupProps) {
    return (
        <>
            <Label htmlFor={id} required={required} error={error}>{label}</Label>
            <InputGroup id={id} error={error} required={required} {...rest} />
            <InputFeedback>{error}</InputFeedback>
        </>
    );
}
