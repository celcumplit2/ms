'use server';

import {createFailedResponse} from '@/core/actions';
import {formDataToObject} from '@/helpers/form-data';
import type {FormState} from '@/hooks/use-action-state';
import {sendApplyForJobForm, sendApplyForm, sendContactsForm, sendHirUsForm, sendScheduleConsultationForm} from '@/modules/form/form.service';
import {redirect} from 'next/navigation';

export async function handleHireUsForm(prevState: FormState, formData: FormData) {
  try {
    await sendHirUsForm({data: formDataToObject(formData)});
  } catch (error) {
    return createFailedResponse(error, formData);
  }

  redirect('/thanks/hire-us');
}

export async function handleContactsForm(prevState: FormState, formData: FormData) {
  try {
    await sendContactsForm({data: formDataToObject(formData)});
  } catch (error) {
    return createFailedResponse(error, formData);
  }

  redirect('/thanks/contacts');
}

export async function handleApplyForm(prevState: FormState, formData: FormData) {
  try {
    await sendApplyForm({data: formDataToObject(formData)});
  } catch (error) {
    return createFailedResponse(error, formData);
  }

  redirect('/thanks/apply-for');
}

export async function handleApplyForJobForm(prevState: FormState, formData: FormData) {
  try {
    await sendApplyForJobForm({data: formDataToObject(formData)});
  } catch (error) {
    return createFailedResponse(error, formData);
  }

  redirect('/thanks/apply-for-job');
}

export async function handleScheduleConsultationJobForm(prevState: FormState, formData: FormData) {
  try {
    await sendScheduleConsultationForm({data: formDataToObject(formData)});
  } catch (error) {
    return createFailedResponse(error, formData);
  }

  redirect('/thanks/schedule-consultation');
}
