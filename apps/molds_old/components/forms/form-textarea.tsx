import InputFeedback from '@/components/forms/input-feedback';
import Label from '@/components/forms/label';
import Textarea, {TextareaProps} from '@/components/forms/textarea';

interface FormTextareaProps extends TextareaProps {
    label?: string;
}

export default function FormTextarea({label, id, error, required, ...rest}: FormTextareaProps) {
    return (
        <>
            <Label htmlFor={id} required={required} error={error}>{label}</Label>
            <Textarea id={id} error={error} required={required} {...rest} />
            <InputFeedback>{error}</InputFeedback>
        </>
    );
}
