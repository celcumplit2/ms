'use client';

import Input from '@/components/dashboard/forms/input';
import Select from '@/components/dashboard/forms/select';
import Submit from '@/components/dashboard/forms/submit';
import Textarea from '@/components/dashboard/forms/textarea';
import {CommentStatus, SelectComment} from '@/modules/comment/comment.model';
import {createFormDataFromObject} from '@/helpers/forms';
import {FormState} from '@/hooks/use-action-state';
import useDashboardActionState from '@/hooks/use-dashboard-action-state';
import {format} from 'date-fns';

interface CommentFormProps {
    action: (previousState: FormState, formData: FormData) => Promise<FormState>;
    entity?: SelectComment;
}

export default function CommentForm({action, entity}: CommentFormProps) {
    const {state, formAction} = useDashboardActionState({
        action,
        formData: createFormDataFromObject({
            name: entity?.name || '',
            email: entity?.email || '',
            status: entity?.status || '',
            publishedAt: entity?.publishedAt ? format(entity?.publishedAt, 'yyyy-MM-dd') : '',
            content: entity?.content || '',
        }),
    });

    return (
        <form action={formAction} className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
                <Input
                    name="name"
                    label="Name"
                    defaultValue={state.formData.get('name')?.toString()}
                    error={state.error?.errors?.name}
                />
                <Input
                    name="email"
                    label="E-mail"
                    defaultValue={state.formData.get('email')?.toString()}
                    error={state.error?.errors?.email}
                    type="email"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
                <Select
                    name="status"
                    label="Status"
                    defaultValue={state.formData.get('status')?.toString()}
                    error={state.error?.errors?.status}
                    options={[
                        {value: CommentStatus.draft, label: 'Draft'},
                        {value: CommentStatus.unpublished, label: 'Unpublished'},
                        {value: CommentStatus.published, label: 'Published'},
                    ]}
                />
                <Input
                    name="publishedAt"
                    label="Published At"
                    defaultValue={state.formData.get('publishedAt')?.toString()}
                    error={state.error?.errors?.publishedAt}
                    type="date"
                />
            </div>

            <Textarea
                name="content"
                label="Content"
                defaultValue={state.formData.get('content')?.toString()}
                error={state.error?.errors?.content}
                rows={5}
            />

            <Submit className="mt-3"/>
        </form>
    );
}
