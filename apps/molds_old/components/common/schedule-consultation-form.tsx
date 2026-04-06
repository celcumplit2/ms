'use client';

import {handleScheduleConsultationJobForm} from '@/modules/form/form.action';
import Button from '@/components/forms/button';
import Fieldset from '@/components/forms/fieldset';
import Form from '@/components/forms/form';
import FormCheckboxLabel from '@/components/forms/form-checkbox-label';
import FormInput from '@/components/forms/form-input';
import FormInputGroup from '@/components/forms/form-input-group';
import FormTextarea from '@/components/forms/form-textarea';
import useActionState from '@/hooks/use-action-state';
import styles from '@/styles/scss/common/schedule-consultation-form.module.scss';
import {ProblemDetailType} from '@/types/errors';
import {clsx} from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

export default function ScheduleConsultationForm({className, ...restProps}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    const {state, formAction, pending} = useActionState({
        action: handleScheduleConsultationJobForm,
    });

    return (
        <section id="schedule-a-consultation" className={clsx(styles['schedule-consultation-form'], className)} {...restProps}>
            <Form
                className={styles['schedule-a-consultation-form']}
                action={formAction}
                success={state.success}
                thanksId="hire-us-form-success"
                thanksMessage="Thank you for your inquiry. We&apos;ll get back to you in 1-3 business days."
                internalError={state.error?.type === ProblemDetailType.InternalServerError ? state.error?.title : null}
            >
                <h3>Schedule a Consultation</h3>
                <p>Is your organization expected to meet the requirements of WCAG 2.0 or WCAG 2.1?</p>


                <Fieldset className={styles['grid']}>
                    <div>
                        <FormInput
                            label="First name"
                            name="name"
                            id="name"
                            required={true}
                            placeholder="John"
                            defaultValue={state.formData.get('name')?.toString()}
                            error={state.error?.errors?.name}
                            maxLength={255}
                            autoComplete="given-name"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Last name"
                            name="surname"
                            id="surname"
                            required={true}
                            placeholder="Doe"
                            defaultValue={state.formData.get('surname')?.toString()}
                            error={state.error?.errors?.surname}
                            maxLength={255}
                            autoComplete="family-name"
                        />
                    </div>
                    <div>
                        <FormInput
                            type="url"
                            label="Company website"
                            name="website"
                            id="website"
                            placeholder="https://moldstud.com"
                            defaultValue={state.formData.get('website')?.toString()}
                            error={state.error?.errors?.website}
                            maxLength={255}
                            autoComplete="url"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Title"
                            name="title"
                            id="title"
                            placeholder="CEO"
                            defaultValue={state.formData.get('title')?.toString()}
                            error={state.error?.errors?.title}
                            maxLength={255}
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Company"
                            name="company"
                            id="company"
                            placeholder="MoldStud"
                            defaultValue={state.formData.get('company')?.toString()}
                            error={state.error?.errors?.company}
                            maxLength={255}
                            autoComplete="organization"
                        />
                    </div>

                    <div>
                        <FormInput
                            type="email"
                            label="E-mail Address"
                            name="email"
                            id="email"
                            required={true}
                            placeholder="jdoe@moldstud.com"
                            defaultValue={state.formData.get('email')?.toString()}
                            error={state.error?.errors?.email}
                            maxLength={254}
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <FormInput
                            type="tel"
                            label="Phone number"
                            name="phone"
                            id="phone"
                            placeholder="+1 (408) 123 4567"
                            defaultValue={state.formData.get('phone')?.toString()}
                            error={state.error?.errors?.phone}
                            maxLength={15}
                            minLength={7}
                            autoComplete="tel"
                        />
                    </div>

                    <div>
                        <FormInputGroup
                            type="number"
                            label="Budget"
                            name="budget"
                            id="budget"
                            required={true}
                            placeholder="150000"
                            defaultValue={state.formData.get('budget')?.toString()}
                            error={state.error?.errors?.budget}
                            addon="&euro;"
                        />
                    </div>

                    <div>
                        <FormTextarea
                            label="Message"
                            name="message"
                            id="message"
                            required={true}
                            defaultValue={state.formData.get('message')?.toString()}
                            error={state.error?.errors?.message}
                            rows={5}
                            maxLength={5000}
                        />
                    </div>
                </Fieldset>

                <FormCheckboxLabel
                    label={<>You agree to our friendly <Link href="/privacy-policy">privacy policy</Link></>}
                    name="acceptPolicy"
                    required={true}
                    defaultChecked={state.formData.get('acceptPolicy')?.toString() === 'on'}
                    error={state.error?.errors?.acceptPolicy}
                />

                <Button type="submit" disabled={pending}>
                    Schedule a Consultation
                </Button>
            </Form>

            <Image
                src="/images/forms/schedule-a-call.png"
                alt="Schedule a Consultation Image"
                width="608"
                height="1024"
                loading="lazy"
                sizes="(width < 576px) 543w, (min-width: 576px and width < 768px) 608w, (min-wdith: 768px and width < 992px) 608w, (min-width: 992px) 548w"
            />
        </section>
    );
}
