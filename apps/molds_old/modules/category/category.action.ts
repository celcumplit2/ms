'use server';

import {SelectOption} from '@/components/dashboard/forms/native-select';
import {createFailedResponse, createSuccessfulResponse} from '@/core/actions';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {slugify} from '@/helpers';
import {formDataToObject} from '@/helpers/form-data';
import {FormState} from '@/hooks/use-action-state';
import {addCategory, browseRootCategories, deleteCategory, editCategory, readCategoryByAlias} from '@/modules/category/category.service';
import {ImportCategory, UpdateCategoryDescription} from '@/types/import';
import {revalidatePath} from 'next/cache';

const PATH_ROOT = '/dashboard/categories';

export async function addCategoryAction(previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await addCategory({data: formDataToObject(formData)});

    revalidatePath(PATH_ROOT);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function editCategoryAction(id: number, previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const payload = await editCategory({id, data: formDataToObject(formData)});

    revalidatePath(`${PATH_ROOT}/edit/${id}`);

    return createSuccessfulResponse(payload, formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function deleteCategoryAction(id: number): Promise<void | string> {
  try {
    await deleteCategory({id});

    revalidatePath(PATH_ROOT);
  } catch (error) {
    return error instanceof Error ? error.message : 'Something goes wrong on server side!';
  }
}

export async function getParentSelectOptions(): Promise<SelectOption[]> {
  const collection = await browseRootCategories({offset: 0, limit: 1000});

  return [
    {label: 'No parent', value: ''},
    ...collection.items.map((category) => ({
      label: category.name,
      value: String(category.id),
    })),
  ];
}

export async function importCategory({payload}: { payload: ImportCategory }): Promise<{ title: string, message: string } | void> {
  const category = payload.parent
    ? await readCategoryByAlias({alias: payload.parent})
    : null;

  try {
    await addCategory({
      data: {
        parentId: category ? category.id : null,
        alias: slugify(payload.title),
        name: payload.title,
      },
    });
  } catch (error) {
    return {
      title: payload.title,
      message: error instanceof UnprocessablePayload ? JSON.stringify(error.errors) : `${error}`,
    };
  }
}

export async function updateCategoryDescription({payload}: { payload: UpdateCategoryDescription }): Promise<{
  title: string,
  message: string
} | void> {
  const category = await readCategoryByAlias({alias: payload.Category.substring(2)});

  if (!category) {
    return {
      title: payload.Category,
      message: 'The category was not found!',
    };
  }

  try {
    await editCategory({
      id: category.id,
      data: {
        name: category.name,
        alias: category.alias,
        parentId: category.parentId,
        description: payload.Content,
      },
    });
  } catch (error) {
    return {
      title: payload.Category,
      message: error instanceof UnprocessablePayload ? JSON.stringify(error.errors) : `${error}`,
    };
  }
}
