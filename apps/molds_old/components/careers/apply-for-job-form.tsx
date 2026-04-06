'use client';

import {handleApplyForJobForm} from '@/modules/form/form.action';
import Button from '@/components/forms/button';
import Form from '@/components/forms/form';
import FormCheckboxLabel from '@/components/forms/form-checkbox-label';
import FormFileInput from '@/components/forms/form-file-input';
import FormInput from '@/components/forms/form-input';
import useActionState from '@/hooks/use-action-state';
import styles from '@/styles/scss/careers/apply-for-job-form.module.scss';
import {ProblemDetailType} from '@/types/errors';
import Image from 'next/image';
import Link from 'next/link';

export default function ApplyForJobForm() {
    const {state, formAction, pending} = useActionState({
        action: handleApplyForJobForm,
    });

    return (
        <Form
            id={styles['apply-for-job-form']}
            action={formAction}
            success={state.success}
            thanksId="apply-form-success"
            thanksMessage="Thank you for applying! We’ve successfully received your application."
            internalError={state.error?.type === ProblemDetailType.InternalServerError ? state.error?.title : null}
        >
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

            <FormInput
                type="tel"
                label="Phone number"
                name="phone"
                placeholder="+37369123456"
                defaultValue={state.formData.get('phone')?.toString()}
                error={state.error?.errors?.phone}
                maxLength={15}
                autoComplete="tel"
            />

            <FormInput
                label="Telegram"
                name="telegram"
                placeholder="johndoe"
                defaultValue={state.formData.get('telegram')?.toString()}
                error={state.error?.errors?.telegram}
                maxLength={255}
            />

            <FormInput
                label="LinkedIn"
                name="linkedin"
                placeholder="https://www.linkedin.com/in/john-doe/"
                defaultValue={state.formData.get('linkedin')?.toString()}
                error={state.error?.errors?.linkedin}
                maxLength={255}
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
