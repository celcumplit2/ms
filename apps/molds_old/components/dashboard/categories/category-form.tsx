'use client';

import Input from '@/components/dashboard/forms/input';
import {SelectOption} from '@/components/dashboard/forms/native-select';
import Select from '@/components/dashboard/forms/select';
import Submit from '@/components/dashboard/forms/submit';
import Textarea from '@/components/dashboard/forms/textarea';
import {SelectCategory} from '@/modules/category/category.model';
import {slugify} from '@/helpers';
import {createFormDataFromObject} from '@/helpers/forms';
import {FormState} from '@/hooks/use-action-state';
import useDashboardActionState from '@/hooks/use-dashboard-action-state';
import {ChangeEvent, useState} from 'react';

interface CategoryFormProps {
    action: (previousState: FormState, formData: FormData) => Promise<FormState>;
    entity?: SelectCategory;
    parentOptions: SelectOption[];
}

export default function CategoryForm({action, entity, parentOptions}: CategoryFormProps) {
    const {state, formAction} = useDashboardActionState({
        action,
        formData: createFormDataFromObject({
            name: entity?.name ?? '',
            alias: entity?.alias ?? '',
            parentId: entity?.parentId ?? '',
        }),
    });

    const [name, setName] = useState(state.formData.has('name') ? state.formData.get('name')!.toString() : '');
    const [alias, setAlias] = useState(state.formData.has('alias') ? state.formData.get('alias')!.toString() : '');

    function onChangeName(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        setAlias(slugify(event.target.value));
    }

    function onChangeAlias(event: ChangeEvent<HTMLInputElement>) {
        setAlias(event.target.value);
    }

    return (
        <form action={formAction} className="flex flex-col gap-2">
            <Input
                name="name"
                label="Name"
                value={name}
                onChange={onChangeName}
                error={state.error?.errors?.name}
            />
            <Input
                name="alias"
                label="Alias"
                value={alias}
                onChange={onChangeAlias}
                error={state.error?.errors?.alias}
            />
            <Textarea
                name="description"
                label="Description"
                defaultValue={state.formData.get('description')?.toString()}
                error={state.error?.errors?.description}
            />
            <Select
                name="parentId"
                label="Parent"
                defaultValue={state.formData.get('parentId')?.toString()}
                error={state.error?.errors?.parentId}
                options={parentOptions}
            />
            <Submit className="mt-3"/>
        </form>
    );
}
