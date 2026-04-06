import Input, {InputProps} from '@/components/forms/input';

export type CheckboxProps = Omit<InputProps, 'type'>;

export default function Checkbox({name, error, required, ...rest}: CheckboxProps) {
    return (
        <Input
            name={name}
            error={error}
            required={required}
            {...rest}
            type="checkbox"
        />
    );
}
