'use client';

import {handleContactsForm} from '@/modules/form/form.action';
import Button from '@/components/forms/button';
import Form from '@/components/forms/form';
import FormCheckboxLabel from '@/components/forms/form-checkbox-label';
import FormInput from '@/components/forms/form-input';
import FormTextarea from '@/components/forms/form-textarea';
import InputCaptcha from '@/components/forms/input-captcha';
import useActionState from '@/hooks/use-action-state';
import useReCaptcha from '@/hooks/use-re-captcha';
import styles from '@/styles/scss/common/contacts-form.module.scss';
import {ProblemDetailType} from '@/types/errors';
import Link from 'next/link';

export default function ContactsForm() {
    const {state, formAction, pending} = useActionState({
        action: handleContactsForm,
    });
    const {hasToken, onTokenChange, onFormChange, requestTokenGeneration} = useReCaptcha({
        inputs: ['name', 'email', 'subject', 'message'],
    });

    return (
        <Form
            className={styles['contacts-form']}
            action={formAction}
            success={state.success}
            thanksId="contacts-form-success"
            thanksMessage="Thank you for your message. We&apos;ll get back to you in 1-3 business days."
            internalError={state.error?.type === ProblemDetailType.InternalServerError ? state.error?.title : null}
            onChange={onFormChange}
        >
            <h2>Tell us about yourself</h2>
            <p>Whether you have questions or you would just like to say hello, contact us.</p>

            <FormInput
                label="Name"
                name="name"
                required={true}
                placeholder="John Doe"
                defaultValue={state.formData.get('name')?.toString()}
                error={state.error?.errors?.name}
                maxLength={255}
                autoComplete="name"
            />

            <FormInput
                type="email"
                label="E-mail Address"
                name="email"
                required={true}
                placeholder="jdoe@moldstud.com"
                defaultValue={state.formData.get('email')?.toString()}
                error={state.error?.errors?.email}
                maxLength={254}
                autoComplete="email"
            />

            <FormInput
                label="Subject"
                name="subject"
                required={true}
                placeholder="How to hire a dedicated team?"
                defaultValue={state.formData.get('subject')?.toString()}
                error={state.error?.errors?.subject}
                maxLength={255}
            />

            <FormTextarea
                label="How can we help you?"
                name="message"
                required={true}
                defaultValue={state.formData.get('message')?.toString()}
                error={state.error?.errors?.message}
                rows={5}
                maxLength={5000}
            />

            <FormCheckboxLabel
                label={<>You agree to our friendly <Link href="/privacy-policy">privacy policy</Link></>}
                name="acceptPolicy"
                required={true}
                defaultChecked={state.formData.get('acceptPolicy')?.toString() === 'on'}
                error={state.error?.errors?.acceptPolicy}
            />

            <InputCaptcha
                name="token"
                error={state.error?.errors?.token}
                reCaptchaAction="contactsForm"
                onTokenChange={onTokenChange}
                generateWhenReady={false}
                requestGeneration={requestTokenGeneration}
            />

            <Button type="submit" disabled={pending || !hasToken}>
                Let&apos;s Start Working Together
            </Button>
            <p>We&apos;ll get back to you in 1-3 business days.</p>
        </Form>
    );
}
