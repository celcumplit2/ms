import InputFeedback from '@/components/forms/input-feedback';
import Label from '@/components/forms/label';
import Select, {SelectProps} from '@/components/forms/select';

interface FormSelectProps extends SelectProps {
    label?: string;
}

export default function FormSelect({label, id, error, required, ...rest}: FormSelectProps) {
    return (
        <>
            <Label htmlFor={id} required={required} error={error}>{label}</Label>
            <Select id={id} error={error} required={required} {...rest} />
            <InputFeedback>{error}</InputFeedback>
        </>
    );
}
