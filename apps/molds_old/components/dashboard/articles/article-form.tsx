'use client';

import CustomSelect, {SelectOption} from '@/components/dashboard/forms/custom-select';
import Editor from '@/components/dashboard/forms/editor';
import Fieldset from '@/components/dashboard/forms/fieldset';
import Input from '@/components/dashboard/forms/input';
import Select from '@/components/dashboard/forms/select';
import Submit from '@/components/dashboard/forms/submit';
import Textarea from '@/components/dashboard/forms/textarea';
import {ArticleStatus, SelectArticle} from '@/modules/article/article.model';
import {objectToFromData} from '@/helpers/form-data';
import {findDefaultValueFromFormDataEntryValue} from '@/helpers/select';
import {FormState} from '@/hooks/use-action-state';
import useDashboardActionState from '@/hooks/use-dashboard-action-state';
import {format} from 'date-fns';

interface ArticleFormProps {
    action: (previousState: FormState, formData: FormData) => Promise<FormState>;
    categoryOptions: SelectOption[];
    authorOptions: SelectOption[];
    entity?: SelectArticle;
}

export default function ArticleForm({action, categoryOptions, authorOptions, entity}: ArticleFormProps) {
    const {state, formAction} = useDashboardActionState({
        action,
        formData: objectToFromData({
            authorId: entity?.authorId ? String(entity?.authorId) : '',
            categoryId: entity?.categoryId ? String(entity?.categoryId) : '',
            title: entity?.title || '',
            alias: entity?.alias || '',
            image: entity?.image || '',
            timeToRead: entity?.timeToRead ? String(entity?.timeToRead) : '',
            publishedAt: entity?.publishedAt ? format(entity?.publishedAt, 'yyyy-MM-dd') : '',
            status: entity?.status || '',
            intro: entity?.intro || '',
            content: entity?.content || '',
            'meta[title]': entity?.metaTitle || '',
            'meta[description]': entity?.metaDescription || '',
        }),
    });

    return (
        <form action={formAction} className="flex flex-col gap-2">
            <Fieldset legend="General">
                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        name="title"
                        label="Title"
                        defaultValue={state.formData.get('title')?.toString()}
                        error={state.error?.errors?.title}
                    />
                    <Input
                        name="alias"
                        label="Alias"
                        defaultValue={state.formData.get('alias')?.toString()}
                        error={state.error?.errors?.alias}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        name="image"
                        label="Image"
                        defaultValue={state.formData.get('image')?.toString()}
                        error={state.error?.errors?.image}
                    />
                    <Input
                        name="timeToRead"
                        label="Time to Read"
                        defaultValue={state.formData.get('timeToRead')?.toString()}
                        error={state.error?.errors?.timeToRead}
                        type="number"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        name="publishedAt"
                        label="Published At"
                        defaultValue={state.formData.get('publishedAt')?.toString()}
                        error={state.error?.errors?.publishedAt}
                        type="date"
                    />
                    <Select
                        name="status"
                        label="Status"
                        defaultValue={state.formData.get('status')?.toString()}
                        error={state.error?.errors?.status}
                        options={[
                            {value: ArticleStatus.draft, label: 'Draft'},
                            {value: ArticleStatus.unpublished, label: 'Unpublished'},
                            {value: ArticleStatus.published, label: 'Published'},
                        ]}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <CustomSelect
                        instanceId="authorId"
                        name="authorId"
                        label="Author"
                        options={authorOptions}
                        defaultValue={findDefaultValueFromFormDataEntryValue(authorOptions, state.formData.get('authorId'))}
                        id="authorId"
                    />

                    <CustomSelect
                        instanceId="categoryId"
                        name="categoryId"
                        label="Category"
                        options={categoryOptions}
                        defaultValue={findDefaultValueFromFormDataEntryValue(categoryOptions, state.formData.get('categoryId'))}
                        id="categoryId"
                    />
                </div>

                <Textarea
                    name="intro"
                    label="Intro"
                    defaultValue={state.formData.get('intro')?.toString()}
                    error={state.error?.errors?.intro}
                    rows={5}
                />

                <Editor
                    name="content"
                    label="Content"
                    setContents={state.formData.get('content')?.toString()}
                    error={state.error?.errors?.content}
                />
            </Fieldset>

            <Fieldset legend="Meta-Data">
                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        name="meta[title]"
                        label="Title"
                        defaultValue={state.formData.get('meta[title]')?.toString()}
                        error={state.error?.errors?.['meta[title]']}
                    />
                    <Input
                        name="meta[description]"
                        label="Description"
                        defaultValue={state.formData.get('meta[description]')?.toString()}
                        error={state.error?.errors?.['meta[description]']}
                    />
                </div>
            </Fieldset>

            <Submit className="mt-3"/>
        </form>
    );
}
