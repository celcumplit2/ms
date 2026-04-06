'use client';

import Editor from '@/components/dashboard/forms/editor';
import Fieldset from '@/components/dashboard/forms/fieldset';
import Input from '@/components/dashboard/forms/input';
import Label from '@/components/dashboard/forms/label';
import Select from '@/components/dashboard/forms/select';
import Submit from '@/components/dashboard/forms/submit';
import {SelectAuthor} from '@/modules/author/author.model';
import {slugify} from '@/helpers';
import {createFormDataFromObject} from '@/helpers/forms';
import {FormState} from '@/hooks/use-action-state';
import useDashboardActionState from '@/hooks/use-dashboard-action-state';
import {IconTrash} from '@tabler/icons-react';
import {ChangeEvent, MouseEvent, useState} from 'react';

interface AuthorFormProps {
    action: (previousState: FormState, formData: FormData) => Promise<FormState>;
    entity?: SelectAuthor;
}

export default function AuthorForm({action, entity}: AuthorFormProps) {
    const {state, formAction} = useDashboardActionState({
        action,
        formData: createFormDataFromObject({
            alias: entity?.alias ?? '',
            fullName: entity?.fullName ?? '',
            position: entity?.position ?? '',
            photo: entity?.photo ?? '',
            bio: entity?.bio ?? '',
            'education[institution]': entity?.education.institution ?? '',
            'education[field]': entity?.education.field ?? '',
            'education[degree]': entity?.education.degree ?? '',
            'meta[title]': entity?.metaTitle ?? '',
            'meta[description]': entity?.metaDescription ?? '',
        }),
    });
    const [fullName, setFullName] = useState(String(state.formData.get('fullName')?.toString()));
    const [alias, setAlias] = useState(String(state.formData.get('alias')?.toString()));
    const [expertise, setExpertise] = useState<string[]>(entity?.expertise || ['']);
    const [socials, setSocials] = useState<Array<{ type: string, url: string }>>(entity?.socials || [{type: '', url: ''}]);

    function onChangeFullName(event: ChangeEvent<HTMLInputElement>) {
        setFullName(event.target.value);
        setAlias(slugify(event.target.value));
    }

    function onChangeAlias(event: ChangeEvent<HTMLInputElement>) {
        setAlias(event.target.value);
    }

    function addExpertise(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        setExpertise([...expertise, '']);
    }

    function deleteExpertise(index: number) {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            setExpertise(expertise.filter((_, i) => i !== index));
        };
    }

    function addSocials(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        setSocials([...socials, {type: '', url: ''}]);
    }

    function deleteSocials(index: number) {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            setSocials(socials.filter((_, i) => i !== index));
        };
    }

    return (
        <form action={formAction} className="flex flex-col gap-2">
            <Fieldset legend="General">
                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        name="fullName"
                        label="Full Name"
                        value={fullName}
                        onChange={onChangeFullName}
                        error={state.error?.errors?.fullName}
                    />
                    <Input
                        name="alias"
                        label="Alias"
                        value={alias}
                        onChange={onChangeAlias}
                        error={state.error?.errors?.alias}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        name="position"
                        label="Position"
                        defaultValue={state.formData.get('position')?.toString()}
                        error={state.error?.errors?.position}
                    />
                    <Input
                        name="photo"
                        label="Photo"
                        defaultValue={state.formData.get('photo')?.toString()}
                        error={state.error?.errors?.photo}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <Input
                        name="education[institution]"
                        label="Education Institution"
                        defaultValue={state.formData.get('education[institution]')?.toString()}
                        error={state.error?.errors?.['education[institution]']}
                    />
                    <Input
                        name="education[field]"
                        label="Education Field"
                        defaultValue={state.formData.get('education[field]')?.toString()}
                        error={state.error?.errors?.['education[field]']}
                    />
                    <Input
                        name="education[degree]"
                        label="Education Degree"
                        defaultValue={state.formData.get('education[degree]')?.toString()}
                        error={state.error?.errors?.['education[degree]']}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label hasError={false}>Expertise</Label>
                    {expertise.map((item, index) => (
                        <div
                            key={`expertise-${index}`}
                            className="flex gap-2"
                        >
                            <Input
                                name={`expertise[${index}]`}
                                defaultValue={item}
                                error={state.error?.errors?.[`expertise[${index}]`]}
                            />
                            <button
                                className="bg-red-500 px-2 text-white"
                                onClick={deleteExpertise(index)}
                            >
                                <IconTrash/>
                            </button>
                        </div>
                    ))}
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 inline-block items-center"
                        onClick={addExpertise}
                    >
                        Add Expertise
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <Label hasError={false}>Socials</Label>
                    {socials.map((item, index) => (
                        <div
                            key={`socials-${index}`}
                            className="flex gap-2"
                        >
                            <Select
                                name={`socials[${index}][type]`}
                                label="Type"
                                defaultValue={item.type}
                                error={state.error?.errors?.[`socials[${index}][type]`]}
                                options={[
                                    {label: 'Instagram', value: 'instagram'},
                                    {label: 'Facebook', value: 'facebook'},
                                    {label: 'LinkedIn', value: 'linkedin'},
                                    {label: 'X (Twitter)', value: 'x'},
                                    {label: 'GitHub', value: 'github'},
                                ]}
                            />
                            <Input
                                name={`socials[${index}][url]`}
                                label="URL"
                                defaultValue={item.url}
                                error={state.error?.errors?.[`socials[${index}][url]`]}
                            />
                            <button
                                className="bg-red-500 px-2 text-white"
                                onClick={deleteSocials(index)}
                            >
                                <IconTrash/>
                            </button>
                        </div>
                    ))}
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 inline-block items-center"
                        onClick={addSocials}
                    >
                        Add Social
                    </button>
                </div>

                <Editor
                    name="bio"
                    label="BIO"
                    setContents={state.formData.get('bio')?.toString()}
                    error={state.error?.errors?.bio}
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
