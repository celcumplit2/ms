import Input, {InputProps} from '@/components/forms/input';
import InputFeedback from '@/components/forms/input-feedback';
import Label from '@/components/forms/label';

interface FormInputProps extends InputProps {
    label?: string;
}

export default function FormInput({label, id, error, required, ...rest}: FormInputProps) {
    return (
        <>
            <Label htmlFor={id} required={required} error={error}>{label}</Label>
            <Input id={id} error={error} required={required} {...rest} />
            <InputFeedback>{error}</InputFeedback>
        </>
    );
}
