'use server';

import {createFailedResponse, createSuccessfulResponse} from '@/core/actions';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {formDataToObject} from '@/helpers/form-data';
import {FormState} from '@/hooks/use-action-state';
import {addJob, deleteJob, editJob, importJob} from '@/modules/job/job.service';
import {ImportJob} from '@/types/import';
import {revalidatePath} from 'next/cache';

const PATH_ROOT = '/dashboard/jobs';

export async function addJobAction(previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await addJob({data: formDataToObject(formData)});

    revalidatePath(PATH_ROOT);

    return createSuccessfulResponse(payload.id, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function editJobAction(id: number, previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await editJob({id, data: formDataToObject(formData)});

    revalidatePath(`${PATH_ROOT}/edit/${id}`);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function deleteJobAction(id: number): Promise<void | string> {
  try {
    await deleteJob({id});

    revalidatePath(PATH_ROOT);
  } catch (error) {
    return error instanceof Error ? error.message : 'Something goes wrong on server side!';
  }
}

export async function importJobAction({payload}: { payload: ImportJob }): Promise<{ title: string, message: string } | void> {
  try {
    await importJob({payload});
  } catch (error) {
    return {
      title: payload.title,
      message: error instanceof UnprocessablePayload ? JSON.stringify(error.errors) : `${error}`,
    };
  }
}
