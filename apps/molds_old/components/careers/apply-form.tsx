'use client';

import {handleApplyForm} from '@/modules/form/form.action';
import Button from '@/components/forms/button';
import Form from '@/components/forms/form';
import FormCheckboxLabel from '@/components/forms/form-checkbox-label';
import FormFileInput from '@/components/forms/form-file-input';
import FormInput from '@/components/forms/form-input';
import Input from '@/components/forms/input';
import useActionState from '@/hooks/use-action-state';
import styles from '@/styles/scss/careers/apply-form.module.scss';
import {ProblemDetailType} from '@/types/errors';
import Image from 'next/image';
import Link from 'next/link';

interface ApplyFormProps {
    jobId: string;
    jobUrl: string;
    jobTitle: string;
}

export default function ApplyForm({jobId, jobTitle, jobUrl}: ApplyFormProps) {
    const {state, formAction, pending} = useActionState({
        action: handleApplyForm,
    });

    return (
        <Form
            id={styles['apply-form']}
            action={formAction}
            success={state.success}
            thanksId="apply-form-success"
            thanksMessage="Thank you for applying! We’ve successfully received your application."
            internalError={state.error?.type === ProblemDetailType.InternalServerError ? state.error?.title : null}
        >
            <hgroup>
                <p>Join MoldStud</p>
                <h3>Apply For This Job Opening</h3>
            </hgroup>
            <p>To apply, please fill out the form below with accurate, up-to-date information.</p>

            <Input type="hidden" name="jobId" defaultValue={jobId}/>
            <Input type="hidden" name="jobUrl" defaultValue={jobUrl.toString()}/>
            <Input type="hidden" name="jobTitle" defaultValue={jobTitle}/>

            <FormInput
                label="First name"
                name="name"
                required={true}
                placeholder="John"
                defaultValue={state.formData.get('name')?.toString()}
                error={state.error?.errors?.name}
                maxLength={255}
                autoComplete="given-name"
            />

            <FormInput
                label="Last name"
                name="surname"
                required={true}
                placeholder="Doe"
                defaultValue={state.formData.get('surname')?.toString()}
                error={state.error?.errors?.surname}
                maxLength={255}
                autoComplete="family-name"
            />

            <FormInput
                type="email"
                label="E-mail Address"
                name="email"
                required={true}
                placeholder="jdoe@example.com"
                defaultValue={state.formData.get('email')?.toString()}
                error={state.error?.errors?.email}
                maxLength={254}
                autoComplete="email"
            />

            <FormFileInput
                label="Resume/CV *"
                name="resume"
                // required={true}
                error={state.error?.errors?.resume}
                icon={<Image src="/images/careers/icon-upload.svg" alt="Upload Icon" width="44" height="44" loading="lazy"/>}
                acceptedMimeType="PDF"
                maxSize="3MB"
            />

            <FormFileInput
                label="Cover Letter"
                name="coverLetter"
                error={state.error?.errors?.coverLetter}
                icon={<Image src="/images/careers/icon-upload.svg" alt="Upload Icon" width="44" height="44" loading="lazy"/>}
                acceptedMimeType="PDF"
                maxSize="3MB"
            />

            <FormCheckboxLabel
                label={<>You agree to our friendly <Link href="/privacy-policy">privacy policy</Link></>}
                name="acceptPolicy"
                required={true}
                defaultChecked={state.formData.get('acceptPolicy')?.toString() === 'on'}
                error={state.error?.errors?.acceptPolicy}
            />

            <Button type="submit" disabled={pending}>
                Submit
            </Button>
        </Form>
    );
}
