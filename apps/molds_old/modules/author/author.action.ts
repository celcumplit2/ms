'use server';

import {createFailedResponse, createSuccessfulResponse} from '@/core/actions';
import {formDataToObject} from '@/helpers/form-data';
import {FormState} from '@/hooks/use-action-state';
import {addAuthor, deleteAuthor, editAuthor} from '@/modules/author/author.service';
import {revalidatePath} from 'next/cache';

const PATH_ROOT = '/dashboard/authors';

export async function addAuthorAction(previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await addAuthor({data: formDataToObject(formData)});

    revalidatePath(PATH_ROOT);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function editAuthorAction(id: number, previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await editAuthor({id, data: formDataToObject(formData)});

    revalidatePath(`${PATH_ROOT}/edit/${id}`);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function deleteAuthorAction(id: number): Promise<void | string> {
  try {
    await deleteAuthor({id});

    revalidatePath(PATH_ROOT);
  } catch (error) {
    return error instanceof Error ? error.message : 'Something goes wrong on server side!';
  }
}
