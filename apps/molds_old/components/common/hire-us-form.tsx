'use client';

import {handleHireUsForm} from '@/modules/form/form.action';
import Button from '@/components/forms/button';
import Form from '@/components/forms/form';
import FormCheckboxLabel from '@/components/forms/form-checkbox-label';
import FormInput from '@/components/forms/form-input';
import FormSelect from '@/components/forms/form-select';
import FormTextarea from '@/components/forms/form-textarea';
import InputCaptcha from '@/components/forms/input-captcha';
import useActionState from '@/hooks/use-action-state';
import useReCaptcha from '@/hooks/use-re-captcha';
import styles from '@/styles/scss/common/hire-us-form.module.scss';
import {ProblemDetailType} from '@/types/errors';
import Link from 'next/link';

export default function HireUsForm() {
    const {state, formAction, pending} = useActionState({
        action: handleHireUsForm,
    });
    const {hasToken, onTokenChange, onFormChange, requestTokenGeneration} = useReCaptcha({
        inputs: ['name', 'email', 'service', 'budget', 'message'],
    });

    return (
        <Form
            className={styles['hire-us-form']}
            action={formAction}
            success={state.success}
            thanksId="hire-us-form-success"
            thanksMessage="Thank you for your inquiry. We&apos;ll get back to you in 1-3 business days."
            internalError={state.error?.type === ProblemDetailType.InternalServerError ? state.error?.title : null}
            onChange={onFormChange}
        >
            <h2>Tell us about your project</h2>
            <p>Send an inquiry</p>

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

            <FormSelect
                label="Interested In"
                name="service"
                required={true}
                defaultValue={state.formData.get('service')?.toString()}
                error={state.error?.errors?.service}
                placeholder="Select a Service"
                options={{
                    'dedicated-team': 'Dedicated Team',
                    'it-staff-augmentation': 'IT Staff Augmentation',
                    'custom-software-development': 'Custom Software Development',
                    'consulting': 'Consulting',
                    'web-development': 'Web Development',
                    'mobile-development': 'Mobile Development',
                    'web-design': 'Web Design (UI/UX)',
                    'quality-assurance': 'Quality Assurance & Testing',
                    'devops': 'DevOps',
                    'software-integration': 'Software Integration',
                    'application-modernization': 'Application Modernization',
                    'application-maintenance-and-support': 'Application Maintenance & Support',
                }}
            />

            <FormInput
                type="number"
                label="Budget"
                name="budget"
                required={true}
                placeholder="Your budget in €/£/$"
                defaultValue={state.formData.get('budget')?.toString()}
                error={state.error?.errors?.budget}
            />

            <FormTextarea
                label="Notes"
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
                reCaptchaAction="hireUsForm"
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
