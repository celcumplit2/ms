import Input from '@/components/dashboard/forms/input';
import Submit from '@/components/dashboard/forms/submit';
import clsx from 'clsx';
import Form, {FormProps} from 'next/form';

interface SearchFormProps extends FormProps<HTMLFormElement> {
    defaultValue?: string;
}

export default function SearchForm({defaultValue, className, ...restProps}: SearchFormProps) {
    return (
        <Form className={clsx('w-full flex flex-row gap-2 items-center', className)} {...restProps}>
            <Input
                name="search"
                defaultValue={defaultValue}
                placeholder="Search..."
            />
            <Submit value="Find"/>
        </Form>
    );
}
